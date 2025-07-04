import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USERNAME', 'nest_poc_user'),
  password: configService.get<string>('DB_PASSWORD', 'nest_poc_password'),
  database: configService.get<string>('DB_NAME', 'nest_poc_app'),
  entities: [User, Post],
  synchronize: configService.get<string>('NODE_ENV') === 'development', // Only in development
  logging: configService.get<string>('NODE_ENV') === 'development',
  charset: 'utf8mb4',
  timezone: 'Z', // Use UTC
});