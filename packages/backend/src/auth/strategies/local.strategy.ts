import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserDocument } from '../../users/schemas/user.schema' // Ensure this path is correct

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' }) // Assumes 'username' is the field for username
  }

  async validate(username: string, password: string): Promise<Omit<UserDocument, 'passwordHash'>> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials for local strategy')
    }
    return user
  }
}
