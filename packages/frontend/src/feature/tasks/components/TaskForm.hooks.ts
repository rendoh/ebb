import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskDto } from 'ebb-backend';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createTask } from '../api';
import { CreateTaskFormValues, createTaskFormValuesSchema } from '../schemas';

export function useCreateTaskForm() {
  const {
    register,
    handleSubmit,
    setFocus,
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

  useEffect(() => {
    setFocus('title');
    // 初回マウント時のみ、titleフィールドにフォーカスする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}
