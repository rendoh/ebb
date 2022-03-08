import { AnimatePresence, motion } from 'framer-motion';
import { VFC } from 'react';
import { BiX } from 'react-icons/bi';
import TaskForm from './TaskForm';
import * as styles from './TaskFormModal.css';

export type TaskFormModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const TaskFormModal: VFC<TaskFormModalProps> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className={styles.root}>
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className={styles.modal}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: -20,
            opacity: 0,
            transition: {
              ease: 'easeOut',
            },
          }}
        >
          {onClose && (
            <button
              className={styles.closeButton}
              type="button"
              onClick={onClose}
            >
              <BiX aria-label="閉じる" />
            </button>
          )}
          <TaskForm />
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default TaskFormModal;
