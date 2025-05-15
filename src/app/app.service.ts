import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'RETORNO DO SERVICE APP!';
  }
}
