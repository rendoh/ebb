import { RecipeVariants } from '@vanilla-extract/recipes';
import { VFC } from 'react';
import { size, cx, cy, radius, circlePath, root } from './Spinner.css';

type SpinnerProps = RecipeVariants<typeof circlePath>;

const Spinner: VFC<SpinnerProps> = (props) => (
  <svg className={root} viewBox={`0 0 ${size} ${size}`}>
    <circle className={circlePath(props)} cx={cx} cy={cy} r={radius} />
  </svg>
);

export default Spinner;
