import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const size = 100;
export const cx = size / 2;
export const cy = size / 2;
export const strokeWidth = 12;
export const radius = (100 - 12) / 2;
const strokeDasharray = Math.ceil(radius * 2 * Math.PI);

const rotate = keyframes({
  '0%': {
    transform: 'rotate(0)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const root = style({
  width: 50,
  height: 50,
  animation: `1s linear infinite ${rotate}`,
});

const drawing = keyframes({
  '0%': {
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDashoffset: strokeDasharray * -1,
    animationTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
  },
  '100%': {
    strokeDashoffset: strokeDasharray * -2,
    animationTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
  },
});

export const circlePath = recipe({
  base: {
    stroke: '#000',
    strokeWidth: 12,
    fill: 'none',
    strokeDasharray,
    strokeDashoffset: strokeDasharray,
    animation: `2s infinite ${drawing}`,
  },
  variants: {
    color: {
      red: {
        stroke: '#e85858',
      },
      blue: {
        stroke: '#58a0e8',
      },
    },
  },
  defaultVariants: {
    color: 'red',
  },
});
