import { forwardRef } from 'react';
import Field, { FieldProps } from './Field';
import TextInput, { TextInputProps } from './TextInput';

export type TextInputFieldProps = TextInputProps & FieldProps;

const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  (
    { name, label, htmlFor = name, error, children, id = name, ...props },
    ref,
  ) => (
    <Field label={label} htmlFor={htmlFor} error={error}>
      <TextInput
        {...props}
        name={name}
        ref={ref}
        id={id}
        color={error ? 'error' : 'normal'}
      />
      {children}
    </Field>
  ),
);

TextInputField.displayName = 'TextInputField';

export default TextInputField;
