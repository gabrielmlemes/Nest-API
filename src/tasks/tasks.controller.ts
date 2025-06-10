import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { LoggerInterceptor } from 'src/commom/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/commom/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/commom/interceptors/add-header.interceptor';
import { AuthAdminGuard } from 'src/commom/guards/admin.guard';

@Controller('tasks')
// @UseInterceptors(LoggerInterceptor) -> caso queira interceptar todas as requests
@UseGuards(AuthAdminGuard) // caso queira usar o guard somente nessa rota
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseInterceptors(LoggerInterceptor) // caso queira usar o logger somente nessa rota
  @UseInterceptors(AddHeaderInterceptor) // caso queira usar o header somente nessa rota
  getAllTasks(@Query() paginationDto: PaginationDto) {
    console.log('rota getAllTasks');

    return this.tasksService.findAllTasks(paginationDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findTaskById(id);
  }

  @Post()
  @UseInterceptors(BodyCreateTaskInterceptor)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    console.log('passou no controller');

    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return this.tasksService.update(updateTaskDto, id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
