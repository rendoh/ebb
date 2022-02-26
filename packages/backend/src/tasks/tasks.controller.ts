import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { AuthenticatedRequest } from 'express';
import { TaskPolicyGuard } from './guards/task-policy.guard';

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

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.tasksService.findAll(req.user.uid);
  }

  @Patch(':id')
  @UseGuards(TaskPolicyGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }
}
