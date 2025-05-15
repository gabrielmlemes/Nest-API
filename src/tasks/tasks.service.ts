import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity.';

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
    return this.tasks.find((task) => task.id === +id);
  }

  create(body: Task) {
    const newId = this.tasks.length + 1;
    const newTask: Task = {
      id: newId,
      name: body.name,
      description: body.description,
      completed: body.completed,
    };

    return this.tasks.push(newTask);
  }

  update(body: Task, id: string) {
    // encontrar o tem pelo id e atualizar
    const task = this.tasks.find((task) => task.id === +id);

    if (task) {
      task.name = body.name;
      task.description = body.description;
      task.completed = body.completed;
      return task;
    } else {
      return 'Task not found';
    }
  }

  delete(id: string) {
    return this.tasks.filter((task) => task.id !== +id);
  }
}
