import {
  HttpException,
  HttpStatus,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { Task } from './entities/task.entity.';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Aprender NestJS',
      description:
        'NestJS é uma estrutura de aplicação Node.js que ajuda a estruturar aplicações em uma arquitetura de microsserviços.',
      completed: false,
    },
    {
      id: 2,
      name: 'Aprender TypeScript',
      description:
        'TypeScript é uma linguagem de programação de alto nível que suporta tipagem estática e interfaces dinâmicas.',
      completed: false,
    },
  ];

  findAllTasks() {
    return this.tasks;
  }

  findTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === +id);

    if (task) return task;

    // throw new NotFoundException('Task not found'); // 404
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND); // 404
  }

  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    const newTask: Task = {
      id: newId,
      name: createTaskDto.name,
      description: createTaskDto.description,
      completed: false,
    };

    return this.tasks.push(newTask);
  }

  update(updateTaskDto: UpdateTaskDto, id: string) {
    // encontrar o item pelo id e atualizar
    const task = this.tasks.find((task) => task.id === +id);

    if (task) {
      task.name = updateTaskDto.name || task.name;
      task.description = updateTaskDto.description || task.description;
      task.completed = updateTaskDto.completed || task.completed;
    }

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return `Task ${id} updated successfully`;
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === +id);

    if (taskIndex < 0) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1);
    return `Task ${id} deleted successfully`;
  }
}
