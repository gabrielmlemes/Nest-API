import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization) {
      console.log(`Passou no middleware e adicionou dados na req`);
      req['user'] = {
        token: authorization,
        role: 'admin',
      };
    }

    next();
  }
}
