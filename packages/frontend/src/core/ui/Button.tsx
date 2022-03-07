import classNames from 'classnames';
import { ReactNode, VFC } from 'react';
import { button } from './Button.css';

export type ButtonProps = {
  children: ReactNode;
} & JSX.IntrinsicElements['button'];

const Button: VFC<ButtonProps> = ({
  className,
  type = 'button',
  children,
  ...props
}) => (
  <button className={classNames(button, className)} type={type} {...props}>
    {children}
  </button>
);

export default Button;
