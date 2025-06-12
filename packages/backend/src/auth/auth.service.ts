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
      const { passwordHash, ...result } = user.toObject()
      return result
    }
    return null
  }

  async login(user: Omit<UserDocument, 'passwordHash'>) {
    // User is already validated by LocalStrategy, just generate JWT
    const payload = { username: user.username, sub: user._id.toString() }
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
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

    const user = await this.usersService.create(registerDto)
    const { passwordHash, ...result } = user.toObject()

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
