import React, { useState } from 'react';
import { postsApiClient, CreatePostDto } from '../services/apiClient';
import { useAuth } from '../contexts/AuthContext';
import './CreatePostForm.css';

interface CreatePostFormProps {
  onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty.');
      return;
    }
    setError(null);

    const createPostDto: CreatePostDto = { content };

    try {
      await postsApiClient.postsControllerCreate(createPostDto);
      setContent('');
      onPostCreated();
    } catch (err: any) {
      console.error('Failed to create post:', err);
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <p>Please <a href="/login">login</a> to create a post.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h3>Create New Post</h3>
      {error && <p className="error-message">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        rows={4}
        maxLength={280}
        required
      />
      <div className="form-footer">
        <span>{280 - content.length} characters remaining</span>
        <button type="submit" disabled={!content.trim()}>Post</button>
      </div>
    </form>
  );
};

export default CreatePostForm;