import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post, PostDocument } from './schemas/post.schema'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const newPost = new this.postModel(createPostDto)
    return newPost.save()
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find().sort({ createdAt: -1 }).exec() // Sort by newest
  }

  async findOne(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id).exec()
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`)
    }
    return post
  }

  async likePost(id: string): Promise<PostDocument> {
    const post = await this.postModel
      .findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } }, // Increment likes by 1
        { new: true } // Return the updated document
      )
      .exec()

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`)
    }
    return post
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.postModel.deleteOne({ _id: id }).exec()
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`)
    }
    return { deleted: true, message: 'Post deleted successfully' }
  }
}
