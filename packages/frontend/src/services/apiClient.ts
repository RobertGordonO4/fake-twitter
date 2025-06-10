
import {
  Configuration,
  PostsApi,
  AuthApi,
  // Types ACTUALLY exported by the generated api.ts
  CreatePostDto,
  LoginDto,
  Post,
  RegisterDto
  // User and AuthResponse are NOT exported, so they cannot be imported here yet.
} from './api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Function that dynamically gets the token each time it's called
const getAccessToken = (): string => {
  const token = localStorage.getItem('token');
  return token || ''; // Return empty string instead of null/undefined
};

// Create configuration with a function instead of a static value
const apiConfiguration = new Configuration({
  basePath: API_BASE_URL,
  accessToken: getAccessToken, // Pass the function itself, not the result
});

export const postsApiClient = new PostsApi(apiConfiguration);
export const authApiClient = new AuthApi(apiConfiguration);

// Re-export the DTOs and Model types that ARE available.
export type {
  CreatePostDto,
  LoginDto,
  Post,
  RegisterDto
  // We cannot export User or AuthResponse yet as they are not in api.ts
};

// TEMPORARY: Define placeholder types for User and AuthResponse until backend spec is fixed
// This will allow the frontend to compile, but login/register won't work as expected.
export interface User {
  // Define properties based on what your backend *should* send for a user
  id: string; // Changed from _id to id to match your backend response
  username: string;
  // email?: string; etc.
}

export interface AuthResponse {
  // Define properties based on what your backend *should* send on login/register
  accessToken: string;
  user: User;
}