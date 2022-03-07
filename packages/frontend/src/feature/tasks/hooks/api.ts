import { PaginatedResponseOfTaskDto, ValidationErrorDto } from 'ebb-backend';
import { useQuery } from 'react-query';
import { findAllTasks } from '../api';

export function useTasks() {
  return useQuery<PaginatedResponseOfTaskDto, ValidationErrorDto | Error>(
    'tasks',
    () => findAllTasks(),
  );
}
