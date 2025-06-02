import { Configuration, PostsApi, AuthApi } from './api/api'; // Path to the manually created/generated api.ts

const API_BASE_PATH = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Function to get the current token from AuthContext or localStorage
// This is a common pattern for configuring the API client dynamically.
const getToken = (): string => {
  return localStorage.getItem('token') || '';
};

const getConfiguration = () => {
  return new Configuration({
    basePath: API_BASE_PATH.endsWith('/api') ? API_BASE_PATH.substring(0, API_BASE_PATH.length - '/api'.length) : API_BASE_PATH,
    accessToken: getToken, // Pass the function that retrieves the token
  });
};


export const getPostsApi = () => {
  return new PostsApi(getConfiguration());
};

export const getAuthApi = () => {
  // AuthApi might not always need a token (e.g., for login/register)
  // but it's good practice to pass the config.
  // The generated client might handle this differently.
  return new AuthApi(getConfiguration());
};

// Re-export DTOs and other types from the generated api.ts for convenience
export * from './api/api';