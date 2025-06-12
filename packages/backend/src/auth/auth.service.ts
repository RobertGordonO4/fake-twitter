import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Partial<User> | null> {
    console.log('Validating user:', username);
    console.log('Password provided:', !!pass);
    console.log('Password value:', JSON.stringify(pass));
    console.log('Password type:', typeof pass);

    // Use the method that includes passwordHash
    const user = await this.usersService.findOneByUsernameWithPassword(username);
    
    console.log('User found:', !!user);
    console.log('User has passwordHash:', !!user?.passwordHash);
    console.log('PasswordHash length:', user?.passwordHash?.length);

    if (user && user.passwordHash && (await bcrypt.compare(pass, user.passwordHash))) {
      // Remove passwordHash from the returned object
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  // Updated login method to accept validated user (no re-validation)
  async login(user: Partial<User>) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.usersService.create(registerDto);
    // Remove passwordHash from the returned object
    const { passwordHash, ...result } = user;

    // Optionally log the user in directly after registration
    const payload = { username: result.username, sub: result.id };
    return {
      message: 'User registered successfully',
      accessToken: this.jwtService.sign(payload),
      user: {
        id: result.id,
        username: result.username,
      },
    };
  }
}