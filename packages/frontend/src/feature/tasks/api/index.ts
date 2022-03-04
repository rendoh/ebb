import type {
  CreateTaskDto,
  PaginatedResponseOfTaskDto,
  PaginationQueryDto,
  TaskDto,
  UpdateTaskDto,
} from 'ebb-backend';
import { client } from '../../../core/api/client';

export async function createTask(createTaskDto: CreateTaskDto) {
  return client.post<TaskDto>('/task', createTaskDto);
}

export async function findAllTasks(params?: PaginationQueryDto) {
  return client.get<PaginatedResponseOfTaskDto>('/tasks', {
    params,
  });
}

export async function findOneTask(id: string) {
  return client.get<TaskDto>(`/tasks/${id}`);
}

export async function updateTask(updateTaskDto: UpdateTaskDto) {
  return client.patch<TaskDto>('/task', updateTaskDto);
}

export async function removeTask(id: string) {
  return client.delete<null>(`/tasks/${id}`);
}
