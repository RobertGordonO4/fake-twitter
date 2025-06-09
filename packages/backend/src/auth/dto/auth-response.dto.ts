import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: '605c72ef2970e3001f5565a1', description: 'User unique ID' })
  _id: string; // Or id: string, if you use that

  @ApiProperty({ example: 'johndoe', description: 'Username' })
  username: string;

  // Add other properties you return for the user object
  // @ApiProperty({ example: 'john.doe@example.com' })
  // email: string;

  // Make sure all properties you want in the API response have @ApiProperty()
}
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token for authentication.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Authenticated user details.',
    type: () => UserEntity, // Use your actual User entity/DTO class here
  })
  user: UserEntity; // Or whatever your User type/entity is
}
