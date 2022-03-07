import type {
  CreateTaskDto,
  PaginatedResponseOfTaskDto,
  PaginationQueryDto,
  TaskDto,
  UpdateTaskDto,
} from 'ebb-backend';
import { client } from '../../../core/api/client';

export async function createTask(createTaskDto: CreateTaskDto) {
  const { data } = await client.post<TaskDto>('/tasks', createTaskDto);
  return data;
}

export async function findAllTasks(params?: PaginationQueryDto) {
  const { data } = await client.get<PaginatedResponseOfTaskDto>('/tasks', {
    params,
  });
  return data;
}

export async function findOneTask(id: string) {
  const { data } = await client.get<TaskDto>(`/tasks/${id}`);
  return data;
}

export async function updateTask(updateTaskDto: UpdateTaskDto) {
  const { data } = await client.patch<TaskDto>('/tasks', updateTaskDto);
  return data;
}

export async function removeTask(id: string) {
  const { data } = await client.delete<null>(`/tasks/${id}`);
  return data;
}
