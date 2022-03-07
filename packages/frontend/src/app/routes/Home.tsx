import { VFC } from 'react';
import TaskForm from '../../feature/tasks/components/TaskForm';

const Home: VFC = () => {
  // const { mutate } = useMutation(
  //   (createTaskDto: CreateTaskDto) => {
  //     return createTask(createTaskDto);
  //   },
  //   {
  //     onMutate(vars) {
  //       console.log(vars);
  //     },
  //   },
  // );
  return (
    <div>
      <TaskForm />
    </div>
  );
};

export default Home;
