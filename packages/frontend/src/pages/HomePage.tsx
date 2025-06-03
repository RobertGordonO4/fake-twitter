import React, { useState, useEffect, useCallback } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import { postsApiClient, Post } from '../services/apiClient'; // Assuming CreatePostDto might be needed here or in child components
import './HomePage.css';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await postsApiClient.postsControllerFindAll();
      setPosts(response.data);
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      setError(err.response?.data?.message || err.message || 'Could not load posts.');
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency array is empty as postsApiClient instance is stable

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = () => {
    fetchPosts(); // Refresh posts after a new one is created
  };

  const handleLikePost = async (postId: string) => {
    try {
      await postsApiClient.postsControllerLikePost(postId);
      fetchPosts(); // Re-fetch to update like count
    } catch (err: any) {
      console.error('Failed to like post:', err.response?.data?.message || err.message);
      // You might want to show an error to the user
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsApiClient.postsControllerRemove(postId);
        fetchPosts(); // Re-fetch to update the list
      } catch (err: any) {
        console.error('Failed to delete post:', err.response?.data?.message || err.message);
        // Show error to user
      }
    }
  };

  if (isLoading) return <p className="loading-message">Loading posts...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="home-page">
      <h1>Feed</h1>
      {/* Pass postsApiClient or specific methods if CreatePostForm needs to make API calls directly */}
      <CreatePostForm onPostCreated={handlePostCreated} />
      <PostList posts={posts} onLikePost={handleLikePost} onDeletePost={handleDeletePost} />
    </div>
  );
};

export default HomePage;