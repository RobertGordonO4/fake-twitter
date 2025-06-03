// src/components/PostList.tsx
import React from 'react';
import { Post } from '../services/apiClient';
import PostItem from './PostItem';

interface PostListProps {
  posts: Post[];
  onLikePost: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onLikePost, onDeletePost }) => {
  if (posts.length === 0) {
    return <p>No posts yet. Be the first to create one!</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => {
        // THE IDENTIFIER FOR POST IS MISSING IN YOUR GENERATED 'Post' TYPE
        // You need to fix this in your backend OpenAPI spec for the Post model.
        // Add an '_id' or 'id' string property.
        // For now, to compile, we can use a placeholder or index, but this is not correct for functionality.
        const key = (post as any)._id || (post as any).id || `post-index-${Math.random()}`; // TEMPORARY KEY
        return (
          <PostItem
            key={key}
            post={post}
            onLike={onLikePost}
            onDelete={onDeletePost}
          />
        );
      })}
    </div>
  );
};

export default PostList;