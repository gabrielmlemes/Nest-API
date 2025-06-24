// ESSE MIDDLEWARE ABAIXO É APENAS PARA EXEMPLIFICAR O QUE PODE SER FEITO NO MIDDLEWARE. PARA ESSA API NÃO FAZ DIFERENÇA!

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization) {
      console.log(
        `(APENAS PARA TESTE) Passou no middleware e recebeu o token: ${authorization}`,
      );
      // req['user'] = {
      //   token: authorization,
      //   role: 'admin',
      // };
    }

    next();
  }
}
