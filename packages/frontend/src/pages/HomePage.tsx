import React, { useState, useEffect, useCallback } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import { getPostsApi, Post } from '../services/apiClient';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // To re-fetch if token changes, or for authenticated actions
  const postsApi = getPostsApi();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await postsApi.postsControllerFindAll();
      setPosts(response.data);
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      setError(err.message || 'Could not load posts.');
    } finally {
      setIsLoading(false);
    }
  }, []); // postsApi instance will be stable if base path and token retrieval are stable

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = () => {
    fetchPosts(); // Refresh posts after a new one is created
  };

  const handleLikePost = async (postId: string) => {
    try {
      await postsApi.postsControllerLikePost(postId);
      fetchPosts(); // Re-fetch to update like count
    } catch (err) {
      console.error('Failed to like post:', err);
      // You might want to show an error to the user
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsApi.postsControllerRemove(postId);
        fetchPosts(); // Re-fetch to update the list
      } catch (err) {
        console.error('Failed to delete post:', err);
        // Show error to user
      }
    }
  };

  if (isLoading) return <p className="loading-message">Loading posts...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="home-page">
      <h1>Feed</h1>
      <CreatePostForm onPostCreated={handlePostCreated} />
      <PostList posts={posts} onLikePost={handleLikePost} onDeletePost={handleDeletePost} />
    </div>
  );
};

export default HomePage;