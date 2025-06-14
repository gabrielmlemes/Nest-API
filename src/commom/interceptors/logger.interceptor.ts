import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Interceptor - ANTES');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Interceptor - DEPOIS - ${Date.now() - now}ms`)),
      );
  }
}

// Interceptor -> Controller -> Service
