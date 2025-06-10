import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/commom/middlewares/logger.middleware';

@Module({
  imports: [TasksModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Poderia deixar o guard no app module, mas não faz sentido todas as rotas passarem pelo guard, por isso colocarei apenas no controller das tasks
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthAdminGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply middleware to all routes and methods
  }
}
