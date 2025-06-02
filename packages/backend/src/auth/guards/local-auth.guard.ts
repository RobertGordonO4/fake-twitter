import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // You can override methods here if needed, e.g., handleRequest
  // For example, to customize the error message or behavior
  // handleRequest(err, user, info, context: ExecutionContext) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException('Custom message from LocalAuthGuard');
  //   }
  //   return user;
  // }
}
