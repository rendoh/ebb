import classNames from 'classnames';
import { forwardRef } from 'react';
import { input } from './TextInput.css';

export type TextInputProps = {
  color?: keyof typeof input;
} & JSX.IntrinsicElements['input'];

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = 'text', className, color = 'normal', ...props }, ref) => (
    <input
      ref={ref}
      className={classNames(input[color], className)}
      type={type}
      {...props}
    />
  ),
);

TextInput.displayName = 'TextInput';

export default TextInput;
