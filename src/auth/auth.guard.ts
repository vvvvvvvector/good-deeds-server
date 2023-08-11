import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const { authorization } = request.headers;

      const [bearer, token] = authorization.split(' ');

      if (!token || bearer !== 'Bearer') {
        throw new UnauthorizedException(
          'You must be authorized to that stuff.',
        );
      }

      const { id } = this.jwtService.verify(token);
      request.userId = id;

      return true;
    } catch (error) {
      throw new UnauthorizedException('You must be authorized to that stuff.');
    }
  }
}
