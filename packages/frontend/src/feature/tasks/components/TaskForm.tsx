import { VFC } from 'react';
import Button from '../../../core/ui/Button';
import TextAreaField from '../../../core/ui/TextAreaField';
import TextInputField from '../../../core/ui/TextInputField';
import * as styles from './TaskForm.css';
import { useCreateTaskForm } from './TaskForm.hooks';

const TaskForm: VFC = () => {
  const { register, handleSubmit, errors } = useCreateTaskForm();

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        {...register('title')}
        label="設問"
        placeholder="戮力協心の意味は？"
        error={errors.title?.message}
      />
      <TextAreaField
        {...register('content')}
        label="覚えたい内容"
        placeholder="心をひとつにして力を合わせること"
        error={errors.content?.message}
      />
      <Button className={styles.submitButton} type="submit" submit>
        保存
      </Button>
    </form>
  );
};

export default TaskForm;
