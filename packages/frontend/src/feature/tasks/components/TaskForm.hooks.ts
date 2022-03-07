import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskDto } from 'ebb-backend';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createTask } from '../api';
import { CreateTaskFormValues, createTaskFormValuesSchema } from '../schemas';

export function useCreateTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskFormValuesSchema),
  });

  const { mutate } = useMutation((createTaskDto: CreateTaskDto) => {
    return createTask(createTaskDto);
  });

  const onSubmit: SubmitHandler<CreateTaskFormValues> = useCallback(
    (createTaskFormValues) => {
      mutate(createTaskFormValues);
    },
    [mutate],
  );

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}
