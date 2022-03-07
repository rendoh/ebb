import classNames from 'classnames';
import { forwardRef } from 'react';
import { input } from './TextInput.css';

export type TextAreaProps = {
  color?: keyof typeof input;
} & JSX.IntrinsicElements['textarea'];

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, color = 'normal', ...props }, ref) => (
    <textarea
      ref={ref}
      className={classNames(input[color], className)}
      {...props}
    />
  ),
);

TextArea.displayName = 'TextArea';

export default TextArea;
