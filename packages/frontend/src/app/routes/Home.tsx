import { useCallback, useState, VFC } from 'react';
import TaskForm from '../../feature/tasks/components/TaskForm';
import TaskFormModal from '../../feature/tasks/components/TaskFormModal';

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
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        commodi placeat eius mollitia nobis. Provident aut harum tempore facilis
        esse reprehenderit doloremque sunt dolore, quo quod, deleniti nesciunt,
        quaerat repellat?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid qui
        quod laboriosam, culpa ipsa debitis laborum voluptates totam veniam,
        corrupti ullam amet ab commodi enim modi, cupiditate vitae cumque.
        Autem!
      </p>
      <button onClick={() => setIsOpen((v) => !v)}>open</button>
      <TaskFormModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
