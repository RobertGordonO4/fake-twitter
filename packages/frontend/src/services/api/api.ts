// MANUAL SIMPLIFIED VERSION - REPLACE THIS FILE AND FOLDER WITH GENERATED CODE

// DTOs (Data Transfer Objects)
export interface User {
  _id: string;
  id?: string; // Sometimes id is preferred over _id
  username: string;
  // other fields like email, etc., if you add them
}

export interface Post {
  _id: string;
  content: string;
  likes: number;
  createdAt?: string; // Dates are often strings in JSON
  updatedAt?: string;
}

export interface CreatePostDto {
  content: string;
}

export interface RegisterDto {
  username: string;
  password?: string; // Password might not be part of the response
}

export interface LoginDto {
  username: string;
  password?: string; // Password might not be part of the response
}

export interface AuthResponse {
  access_token: string;
  user: User;
}


// --- API Class Stubs (very simplified) ---
// The generator will create much more detailed classes with proper Axios integration.

export class Configuration {
    basePath?: string;
    accessToken?: string | (() => string);
    // other config options
    constructor(configurationParameters: { basePath?: string, accessToken?: string | (() => string) } = {}) {
        this.basePath = configurationParameters.basePath;
        this.accessToken = configurationParameters.accessToken;
    }
}


// A very basic Axios instance. The generated client will handle this better.
// You would typically configure axios globally or pass it to the API classes.
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const DUMMY_BASE_PATH = 'http://localhost:3001/api'; // Will be overridden by apiClient.ts

export class BaseAPI {
    protected configuration: Configuration | undefined;
    protected basePath: string;
    protected axios: AxiosInstance;

    constructor(configuration?: Configuration, basePath: string = DUMMY_BASE_PATH, axiosInstance: AxiosInstance = axios) {
        this.configuration = configuration;
        this.basePath = configuration?.basePath || basePath;
        this.axios = axiosInstance; // Use a passed axios instance or a default
    }
};


export class PostsApi extends BaseAPI {
    public async postsControllerCreate(createPostDto: CreatePostDto, options?: AxiosRequestConfig): Promise<{ data: Post }> {
        const localVarAxiosArgs = await this.postsControllerCreateRequestArgs(createPostDto, options);
        return this.axios.request(localVarAxiosArgs);
    }
    private async postsControllerCreateRequestArgs(createPostDto: CreatePostDto, options?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        // Simulate argument preparation
        if (createPostDto === null || createPostDto === undefined) {
            throw new Error("Required parameter createPostDto was null or undefined when calling postsControllerCreate.");
        }
        const localVarPath = `/posts`;
        const localVarUrlObj = new URL(localVarPath, this.basePath);
        const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...options};
        localVarRequestOptions.data = createPostDto;
        if (this.configuration && typeof this.configuration.accessToken === 'function') {
            const token = this.configuration.accessToken();
            localVarRequestOptions.headers = { ...localVarRequestOptions.headers, Authorization: `Bearer ${token}` };
        } else if (this.configuration && this.configuration.accessToken) {
             localVarRequestOptions.headers = { ...localVarRequestOptions.headers, Authorization: `Bearer ${this.configuration.accessToken}` };
        }
        return localVarRequestOptions;
    }


    public async postsControllerFindAll(options?: AxiosRequestConfig): Promise<{ data: Post[] }> {
        const localVarAxiosArgs = await this.postsControllerFindAllRequestArgs(options);
        return this.axios.request(localVarAxiosArgs);
    }
    private async postsControllerFindAllRequestArgs(options?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        const localVarPath = `/posts`;
        const localVarUrlObj = new URL(localVarPath, this.basePath);
        const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...options};
        return localVarRequestOptions;
    }


    public async postsControllerLikePost(id: string, options?: AxiosRequestConfig): Promise<{ data: Post }> {
        const localVarAxiosArgs = await this.postsControllerLikePostRequestArgs(id, options);
        return this.axios.request(localVarAxiosArgs);
    }
    private async postsControllerLikePostRequestArgs(id: string, options?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        if (id === null || id === undefined) {
            throw new Error("Required parameter id was null or undefined when calling postsControllerLikePost.");
        }
        const localVarPath = `/posts/${id}/like`;
        const localVarUrlObj = new URL(localVarPath, this.basePath);
        const localVarRequestOptions: AxiosRequestConfig = { method: 'PATCH', ...options};
        if (this.configuration && typeof this.configuration.accessToken === 'function') {
            const token = this.configuration.accessToken();
            localVarRequestOptions.headers = { ...localVarRequestOptions.headers, Authorization: `Bearer ${token}` };
        } else if (this.configuration && this.configuration.accessToken) {
             localVarRequestOptions.headers = { ...localVarRequestOptions.headers, Authorization: `Bearer ${this.configuration.accessToken}` };
        }
        return localVarRequestOptions;
    }


    public async postsControllerRemove(id: string, options?: AxiosRequestConfig): Promise<{ data: { deleted: boolean; message?: string } }> {
        const localVarAxiosArgs = await this.postsControllerRemoveRequestArgs(id, options);
        return this.axios.request(localVarAxiosArgs);
    }
    private async postsControllerRemoveRequestArgs(id: string, options?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
         if (id === null || id === undefined) {
            throw new Error("Required parameter id was null or undefined when calling postsControllerRemove.");
        }
        const localVarPath = `/posts/${id}`;
        const localVarUrlObj = new URL(localVarPath, this.basePath);
        const localVarRequestOptions: AxiosRequestConfig = { method: 'DELETE', ...options};
        if (this.configuration && typeof this.configuration.accessToken === 'function') {
            const token = this.configuration.accessToken();
            localVarRequestOptions.headers = { ...localVarRequestOptions.headers, Authorization: `Bearer ${token}` };
        } else if (this.configuration && this.configuration.accessToken) {
             localVarRequestOptions.headers = { ...localVarRequestOptions.headers, Authorization: `Bearer ${this.configuration.accessToken}` };
        }
        return localVarRequestOptions;
    }
}


export class AuthApi extends BaseAPI {
    public async authControllerLogin(loginDto: LoginDto, options?: AxiosRequestConfig): Promise<{ data: AuthResponse }> {
        const localVarAxiosArgs = await this.authControllerLoginRequestArgs(loginDto, options);
        return this.axios.request(localVarAxiosArgs);
    }
     private async authControllerLoginRequestArgs(loginDto: LoginDto, options?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        if (loginDto === null || loginDto === undefined) {
            throw new Error("Required parameter loginDto was null or undefined when calling authControllerLogin.");
        }
        const localVarPath = `/auth/login`;
        const localVarUrlObj = new URL(localVarPath, this.basePath);
        const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...options};
        localVarRequestOptions.data = loginDto;
        return localVarRequestOptions;
    }


    public async authControllerRegister(registerDto: RegisterDto, options?: AxiosRequestConfig): Promise<{ data: AuthResponse }> {
        const localVarAxiosArgs = await this.authControllerRegisterRequestArgs(registerDto, options);
        return this.axios.request(localVarAxiosArgs);
    }
    private async authControllerRegisterRequestArgs(registerDto: RegisterDto, options?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
         if (registerDto === null || registerDto === undefined) {
            throw new Error("Required parameter registerDto was null or undefined when calling authControllerRegister.");
        }
        const localVarPath = `/auth/register`;
        const localVarUrlObj = new URL(localVarPath, this.basePath);
        const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...options};
        localVarRequestOptions.data = registerDto;
        return localVarRequestOptions;
    }
}