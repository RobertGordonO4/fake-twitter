import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT token and user info.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, invalid credentials.' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    // loginDto is here for Swagger
    // req.user is populated by LocalAuthGuard/LocalStrategy
    return this.authService.login(req.user) // req.user is already validated user object
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully, returns JWT and user info.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., validation error).' })
  @ApiResponse({ status: 409, description: 'Conflict (e.g., username already exists).' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
}
