import { ReactNode, VFC } from 'react';
import * as styles from './Field.css';

export type FieldProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
  children?: ReactNode;
};

const Field: VFC<FieldProps> = ({ label, htmlFor, error, children }) => (
  <div className={styles.field}>
    {label && (
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
    )}
    {children}
    {error && <p className={styles.feedback}>{error}</p>}
  </div>
);

export default Field;
