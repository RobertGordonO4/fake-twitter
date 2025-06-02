import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService // Inject UsersService if you need to fetch user details
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    // Payload is the decoded JWT
    // You can add more validation here, e.g., check if user exists
    // const user = await this.usersService.findById(payload.sub);
    // if (!user) { throw new UnauthorizedException(); }
    return { userId: payload.sub, username: payload.username } // This will be attached to request.user
  }
}
