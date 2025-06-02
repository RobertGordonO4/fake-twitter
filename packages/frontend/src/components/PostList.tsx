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
      {posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          onLike={onLikePost}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
};

export default PostList;