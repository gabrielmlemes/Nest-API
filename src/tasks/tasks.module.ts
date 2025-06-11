import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { TaskUtils } from './task.utils';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskUtils,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class TasksModule {}
