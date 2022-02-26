import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
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
  public async create(
    @Req() req: AuthenticatedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.uid, createTaskDto);
  }

  @Get()
  public async findAll(@Req() req: AuthenticatedRequest) {
    return this.tasksService.findAll(req.user.uid);
  }

  @Get(':id')
  @UseGuards(TaskPolicyGuard)
  public async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TaskPolicyGuard)
  public async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskPolicyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id') id: string) {
    await this.tasksService.remove(id);
    return null;
  }
}
