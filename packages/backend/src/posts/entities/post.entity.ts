import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique post ID' })
  id: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'This is my first post!', description: 'Content of the post' })
  content: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0, description: 'Number of likes' })
  likes: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'Date when the post was created' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'Date when the post was last updated' })
  updatedAt: Date;
}