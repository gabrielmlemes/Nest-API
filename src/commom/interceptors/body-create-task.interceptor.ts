import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class BodyCreateTaskInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, url, body } = request;

    console.log(`[REQUEST] ${method} ${url}`);
    console.log(`[BODY] ${JSON.stringify(body)}`);

    return next
      .handle()
      .pipe(tap((data) => console.log(`[RESPONSE] ${JSON.stringify(data)}`)));
  }
}
