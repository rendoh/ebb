import { forwardRef } from 'react';
import Field, { FieldProps } from './Field';
import TextArea, { TextAreaProps } from './TextArea';

export type TextAreaFieldProps = TextAreaProps & FieldProps;

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    { name, label, htmlFor = name, error, children, id = name, ...props },
    ref,
  ) => (
    <Field label={label} htmlFor={htmlFor} error={error}>
      <TextArea
        {...props}
        ref={ref}
        id={id}
        color={error ? 'error' : 'normal'}
      />
      {children}
    </Field>
  ),
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
