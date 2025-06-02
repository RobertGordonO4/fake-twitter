import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string

  @Prop({ required: true })
  passwordHash: string // Store hashed password

  // Virtual property for password (not stored in DB)
  @Prop({ type: String, select: false }) // select: false ensures it's not returned by default
  password?: string
}

export const UserSchema = SchemaFactory.createForClass(User)

// Password hashing middleware
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    if (!this.password) return next() // If password is not set (e.g. during other updates)
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.password, salt)
    this.password = undefined // Don't store plain password
  }
  next()
})

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash)
}
