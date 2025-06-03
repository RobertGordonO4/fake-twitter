// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto'; // Assuming this is correctly defined with @ApiProperty
import { LoginDto } from './dto/login.dto';     // Assuming this is correctly defined with @ApiProperty
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto'; // <--- IMPORT YOUR NEW DTO

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token and user info.',
    type: AuthResponseDto, // <--- SPECIFY THE RESPONSE TYPE HERE
  })
  @ApiResponse({ status: 401, description: 'Unauthorized, invalid credentials.' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    // loginDto is used by Swagger from @ApiBody
    // req.user is populated by LocalAuthGuard/LocalStrategy
    // Ensure this.authService.login(req.user) returns an object matching AuthResponseDto structure
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Typically 201 for successful resource creation
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto }) // Make sure RegisterDto is also well-defined for Swagger
  @ApiResponse({
    status: 201,
    description: 'User registered successfully, returns JWT and user info.',
    type: AuthResponseDto, // <--- SPECIFY THE RESPONSE TYPE HERE
  })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., validation error).' })
  @ApiResponse({ status: 409, description: 'Conflict (e.g., username already exists).' })
  async register(@Body() registerDto: RegisterDto) {
    // Ensure this.authService.register(registerDto) returns an object matching AuthResponseDto structure
    return this.authService.register(registerDto);
  }
}