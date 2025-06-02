import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  // Make sure 'export' is here
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'P@$$wOrd123' })
  @IsString()
  @IsNotEmpty()
  password: string
}
