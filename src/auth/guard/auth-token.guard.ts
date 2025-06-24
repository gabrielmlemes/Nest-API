import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/constants/auth-user.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      request[REQUEST_TOKEN_PAYLOAD_NAME] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token not found');
    }

    return true;
  }

  extractTokenHeader(request: Request) {
    const authorization = request.headers?.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return;
    }

    return authorization.split(' ')[1];
  }
}
