import { PaginationDto } from 'src/commom/dto/pagination.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAllTasks(paginationDto?: PaginationDto) {
    const { limit, offset } = paginationDto || {};

    try {
      const allTaks = await this.prisma.task.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return allTaks;
    } catch (error) {
      throw new HttpException('Internal error', HttpStatus.BAD_REQUEST); // 500
      console.log(error);
    }
  }

  async findTaskById(id: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          id: +id,
        },
      });

      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND); // 404
      }

      return task;
    } catch (error) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST); // 404
      console.log(error);
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: false,
          userId: createTaskDto.userId,
        },
      });

      return newTask;
    } catch (error) {
      throw new HttpException('Internal error', HttpStatus.BAD_REQUEST); // 400
      console.log(error);
    }
  }

  async update(updateTaskDto: UpdateTaskDto, id: string) {
    try {
      const findTask = await this.prisma.task.findUnique({
        where: {
          id: +id,
        },
      });

      if (!findTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND); // 404
      }

      const updateTask = await this.prisma.task.update({
        where: {
          id: +id,
        },
        data: {
          name: updateTaskDto.name ?? findTask.name,
          description: updateTaskDto.description ?? findTask.description,
          completed: updateTaskDto.completed ?? findTask.completed,
        },
      });

      return updateTask;
    } catch (error) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST); // 404
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      const findTask = await this.prisma.task.findUnique({
        where: {
          id: +id,
        },
      });

      if (!findTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND); // 404
      }

      const task = await this.prisma.task.delete({
        where: {
          id: findTask.id,
        },
      });
      return { message: 'Task deleted', task };
    } catch (error) {
      throw new HttpException(error + 'Internal error', HttpStatus.BAD_REQUEST); // 500
    }
  }
}
