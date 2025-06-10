import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document & {
  comparePassword(password: string): Promise<boolean>
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string

  @Prop({ required: true, select: false }) // select: false to exclude from queries by default
  passwordHash: string
}

export const UserSchema = SchemaFactory.createForClass(User)

// Password hashing middleware - triggered when passwordHash is set
UserSchema.pre<UserDocument>('save', async function (next) {
  // Only hash if passwordHash was modified and it looks like a plain password (not already hashed)
  if (this.isModified('passwordHash') && this.passwordHash && !this.passwordHash.startsWith('$2b$')) {
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
  }
  next()
})

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash)
}