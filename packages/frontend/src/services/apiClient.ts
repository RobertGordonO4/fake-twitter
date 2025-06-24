import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Import the generated types and API functions
export * from './api/Api';

// Import specific types for re-export with clean names
import type { 
  CreatePostDto, 
  LoginDto, 
  Post, 
  RegisterDto, 
  UserEntity, 
  AuthResponseDto 
} from './api/Api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with base configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor to handle token expiry
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid - just clear it
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export the configured axios instance
export const apiClient = createApiInstance();

// Helper function to make API calls with the configured client
// Returns data in the old format: { data: responseData }
export const makeApiCall = async <T>(config: AxiosRequestConfig): Promise<{ data: T }> => {
  const response = await apiClient(config);
  return { data: response.data }; // Wrap in data property for backward compatibility
};

// Helper for direct data access (new style)
export const makeDirectApiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient(config);
  return response.data;
};

// Auth API functions
export const authApi = {
  login: async (loginDto: LoginDto): Promise<{ data: AuthResponseDto }> => {
    return makeApiCall({
      method: 'POST',
      url: '/api/auth/login',
      data: loginDto,
    });
  },
  
  register: async (registerDto: RegisterDto): Promise<{ data: AuthResponseDto }> => {
    return makeApiCall({
      method: 'POST',
      url: '/api/auth/register',
      data: registerDto,
    });
  },
};

// Posts API functions
export const postsApi = {
  getAllPosts: async (): Promise<{ data: Post[] }> => {
    return makeApiCall({
      method: 'GET',
      url: '/api/posts',
    });
  },
  
  createPost: async (createPostDto: CreatePostDto): Promise<{ data: Post }> => {
    return makeApiCall({
      method: 'POST',
      url: '/api/posts',
      data: createPostDto,
    });
  },
  
  likePost: async (id: string): Promise<{ data: Post }> => {
    return makeApiCall({
      method: 'PATCH',
      url: `/api/posts/${id}/like`,
    });
  },
  
  deletePost: async (id: string): Promise<{ data: void }> => {
    return makeApiCall({
      method: 'DELETE',
      url: `/api/posts/${id}`,
    });
  },
};

// Backward compatibility exports (if your components still use the old names)
export const postsApiClient = {
  ...postsApi,
  // Old openapi-generator-cli method names → new method names
  postsControllerCreate: postsApi.createPost,
  postsControllerFindAll: postsApi.getAllPosts,
  postsControllerLike: postsApi.likePost,
  postsControllerRemove: postsApi.deletePost,
};

export const authApiClient = {
  ...authApi,
  // Old openapi-generator-cli method names → new method names  
  authControllerLogin: authApi.login,
  authControllerRegister: authApi.register,
};

// Type aliases for backward compatibility
export type User = UserEntity;
export type AuthResponse = AuthResponseDto;

// Re-export clean type names  
export type { CreatePostDto, LoginDto, RegisterDto, Post, UserEntity, AuthResponseDto };