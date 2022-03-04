import { PaginatedDto } from '../src/pagination/dto/paginated.dto';
import { TaskDto } from '../src/tasks/dto/task.dto';

export type { TaskDto } from '../src/tasks/dto/task.dto';
export type PaginatedResponseOfTaskDto = PaginatedDto<TaskDto>;
export type { CreateTaskDto } from '../src/tasks/dto/create-task.dto';
export type { UpdateTaskDto } from '../src/tasks/dto/update-task.dto';
