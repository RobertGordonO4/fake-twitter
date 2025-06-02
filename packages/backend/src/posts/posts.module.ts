import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Post, PostSchema } from './schemas/post.schema'
// AuthModule might be needed if you protect routes at module level or need user info
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    // AuthModule, // If JWT guard or user info is needed directly in this module
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
