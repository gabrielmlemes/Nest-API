import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity.';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.findAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findTaskById(id);
  }

  @Post()
  createTask(@Body() body: Task) {
    return this.tasksService.create(body);
  }

  @Patch(':id')
  updateTask(@Body() body: Task, @Param('id') id: string) {
    return this.tasksService.update(body, id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
