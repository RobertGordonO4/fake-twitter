import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  // Make sure 'export' is here
  @ApiProperty({ example: 'john_doe', description: 'User chosen username' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  username: string

  @ApiProperty({ example: 'P@$$wOrd123', description: 'User chosen password (min 8 characters)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
