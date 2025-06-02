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

  return (
    <div className="post-item">
      <p className="post-content">{post.content}</p>
      <div className="post-meta">
        <span>Likes: {post.likes}</span>
        <span>Posted: {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'N/A'}</span>
      </div>
      {isAuthenticated && (
        <div className="post-actions">
          <button onClick={() => onLike(post._id)} className="like-button">Like</button>
          <button onClick={() => onDelete(post._id)} className="delete-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostItem;