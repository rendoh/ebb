import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { globalVars } from '../styles/globalTheme.css';

const firstBarTransition = keyframes({
  '0%': {
    transform: 'translateX(-25%) scaleX(0.25)',
  },
  '75%, 100%': {
    transform: 'translateX(100%) scaleX(1)',
  },
});

const secondBarTransition = keyframes({
  '0%': {
    transform: 'translateX(-100%) scaleX(1)',
  },
  '100%': {
    transform: 'translateX(100%) scaleX(0.25)',
  },
});

export const progress = style({
  display: 'block',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: 5,
  background: globalVars.colors.primaryLight,
  overflow: 'hidden',
  '::before': {
    animation: `${firstBarTransition} 3s cubic-bezier(0.5, 1, 0.89, 1) infinite`,
  },
  '::after': {
    animation: `${secondBarTransition} 3s cubic-bezier(0.32, 0, 0.67, 0) infinite`,
  },
});

globalStyle(`${progress}::before, ${progress}::after`, {
  content: '',
  display: 'block',
  width: '100%',
  height: '100%',
  background: globalVars.colors.primary,
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: 'left center',
});
