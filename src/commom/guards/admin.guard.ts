/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('INÍCIO GUARD-----------');
    console.log(request['user']);

    if (request['user']?.role === 'admin') {
      console.log('VERIFICOU ADMIN');
      console.log('FIM GUARD-----------');
      return true;
    }

    return false;
  }
}
