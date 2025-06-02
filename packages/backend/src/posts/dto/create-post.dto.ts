import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({
    description: 'The content of the post',
    example: 'Hello world from my new app!',
    maxLength: 280,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string
}
