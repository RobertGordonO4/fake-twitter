// src/components/PostItem.tsx
import React from 'react';
import { Post } from '../services/apiClient';
import { useAuth } from '../contexts/AuthContext';
import './PostItem.css';

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLike, onDelete }) => {
  const { isAuthenticated } = useAuth();

  const likesCount = typeof post.likes === 'number' ? post.likes : 0;
  const displayDate = post.createdAt ? new Date(post.createdAt).toLocaleString() : 'N/A';

  // THE IDENTIFIER FOR POST IS MISSING IN YOUR GENERATED 'Post' TYPE
  // This needs to be fixed in your backend OpenAPI spec.
  // For now, these buttons will not work correctly or might pass undefined.
  const postId = (post as any)._id || (post as any).id; // TEMPORARY - this will be undefined

  return (
    <div className="post-item">
      <p className="post-content">{post.content}</p>
      <div className="post-meta">
        <span>Likes: {likesCount}</span>
        <span>Posted: {displayDate}</span>
      </div>
      {isAuthenticated && postId && ( // Only show if postId exists
        <div className="post-actions">
          <button onClick={() => onLike(postId)} className="like-button">Like</button>
          <button onClick={() => onDelete(postId)} className="delete-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostItem;