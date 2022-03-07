import { z } from 'zod';

export const createTaskFormValuesSchema = z.object({
  title: z.string().nonempty().max(256),
  content: z.string().nonempty().max(1024),
});

export type CreateTaskFormValues = z.infer<typeof createTaskFormValuesSchema>;
