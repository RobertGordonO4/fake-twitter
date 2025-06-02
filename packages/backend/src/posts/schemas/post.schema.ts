import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  @ApiProperty({ example: 'This is my first post!', description: 'Content of the post' })
  @Prop({ required: true })
  content: string

  @ApiProperty({ example: 0, description: 'Number of likes' })
  @Prop({ default: 0 })
  likes: number

  @ApiProperty()
  @Prop()
  createdAt?: Date

  @ApiProperty()
  @Prop()
  updatedAt?: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
