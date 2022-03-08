import { RecipeVariants } from '@vanilla-extract/recipes';
import classNames from 'classnames';
import { ReactNode, VFC } from 'react';
import { button } from './Button.css';

export type ButtonProps = {
  children: ReactNode;
} & JSX.IntrinsicElements['button'] &
  RecipeVariants<typeof button>;

const Button: VFC<ButtonProps> = ({
  className,
  type = 'button',
  children,
  submit,
  ...props
}) => (
  <button
    className={classNames(
      button({
        submit,
      }),
      className,
    )}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
