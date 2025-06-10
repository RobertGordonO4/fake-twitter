import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Omit<UserDocument, 'passwordHash'> | null> {
    const user = await this.usersService.findOneByUsername(username)
    if (user && user.passwordHash && (await bcrypt.compare(pass, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user.toObject() // Or user if not Mongoose doc
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { username: user.username, sub: user._id.toString() } // _id from Mongoose
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        // Send some user info back, exclude sensitive data
        id: user._id.toString(),
        username: user.username,
      },
    }
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByUsername(registerDto.username)
    if (existingUser) {
      throw new ConflictException('Username already exists')
    }
    // Password hashing is handled by the pre-save hook in UserSchema
    const user = await this.usersService.create(registerDto)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user.toObject()

    // Optionally log the user in directly after registration
    const payload = { username: result.username, sub: result._id.toString() }
    return {
      message: 'User registered successfully',
      accessToken: this.jwtService.sign(payload),
      user: {
        id: result._id.toString(),
        username: result.username,
      },
    }
  }
}