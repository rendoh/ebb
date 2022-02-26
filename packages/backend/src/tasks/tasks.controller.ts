import {
  Controller,
  Post,
  Body,
  Req,
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import type { AuthenticatedRequest } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.uid, createTaskDto);
  }
}
