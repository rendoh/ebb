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
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { AuthenticatedRequest } from 'express';
import { TaskPolicyGuard } from './guards/task-policy.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { PaginatedDto } from '../pagination/dto/paginated.dto';
import { ApiPaginatedResponse } from '../pagination/decorators/api-paginated-response';
import { PaginationQueryDto } from '../pagination/dto/pagination-query.dto';
import { ApiValidationErrorResponse } from '../validation-error/decorators/api-validation-error-response';

@ApiTags('tasks')
@ApiUnauthorizedResponse()
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskDto })
  @ApiValidationErrorResponse()
  public async create(
    @Req() req: AuthenticatedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.create(req.user.uid, createTaskDto);
  }

  @Get()
  @ApiPaginatedResponse(TaskDto)
  @ApiValidationErrorResponse()
  public async findAll(
    @Req() req: AuthenticatedRequest,
    @Query() { page, limit }: PaginationQueryDto,
  ): Promise<PaginatedDto<TaskDto>> {
    return this.tasksService.findAll(req.user.uid, { page, limit });
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @UseGuards(TaskPolicyGuard)
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @UseGuards(TaskPolicyGuard)
  @ApiValidationErrorResponse()
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiForbiddenResponse()
  @UseGuards(TaskPolicyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.tasksService.remove(id);
    return null;
  }
}
