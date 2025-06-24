/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginDto {
  /** @example "john_doe" */
  username: string;
  /** @example "P@$$wOrd123" */
  password: string;
}

export interface UserEntity {
  /**
   * User unique ID
   * @example "605c72ef2970e3001f5565a1"
   */
  _id: string;
  /**
   * Username
   * @example "johndoe"
   */
  username: string;
}

export interface AuthResponseDto {
  /**
   * JWT access token for authentication.
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;
  /** Authenticated user details. */
  user: UserEntity;
}

export interface RegisterDto {
  /**
   * User chosen username
   * @example "john_doe"
   */
  username: string;
  /**
   * User chosen password (min 8 characters)
   * @example "P@$$wOrd123"
   */
  password: string;
}

export interface CreatePostDto {
  /**
   * The content of the post
   * @maxLength 280
   * @example "Hello world from my new app!"
   */
  content: string;
}

export interface Post {
  /**
   * Unique post ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * Content of the post
   * @example "This is my first post!"
   */
  content: string;
  /**
   * Number of likes
   * @example 0
   */
  likes: number;
  /**
   * Date when the post was created
   * @format date-time
   */
  createdAt: string;
  /**
   * Date when the post was last updated
   * @format date-time
   */
  updatedAt: string;
}
