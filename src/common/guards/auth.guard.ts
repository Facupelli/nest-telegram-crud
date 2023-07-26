import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import admin from 'src/main';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    return this.validateUser(token);
  }

  private extractTokenFromHeader(request) {
    return request.authorization;
  }

  private async validateUser(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      if (decodedToken) {
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException();
    }
  }
}
