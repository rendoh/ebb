import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { globalVars } from '../../../core/styles/globalTheme.css';

const fit = style({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export const root = style([
  fit,
  {
    display: 'flex',
    position: 'fixed',
    zIndex: 1,
    flexDirection: 'column',
  },
]);

export const backdrop = style([
  fit,
  {
    position: 'absolute',
    background: `rgba(0, 0, 0, 0.4)`,
    zIndex: -1,
  },
]);

export const closeButton = style({
  color: globalVars.colors.primary,
  fontSize: 24,
  background: globalVars.colors.background,
  boxShadow: '0px 8px 24px -8px rgba(0, 0, 0, 0.15)',
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'box-shadow 0.2s ease-out',
  position: 'absolute',
  top: 12,
  right: 12,
  ':hover': {
    boxShadow: '0px 8px 12px -8px rgba(0, 0, 0, 0.55)',
  },
});

export const modal = style({
  position: 'relative',
  width: calc.subtract('100%', '40px'),
  maxWidth: 480,
  maxHeight: calc.subtract('100%', '40px'),
  margin: 'auto',
  background: globalVars.colors.background,
  padding: '36px 28px 24px',
  borderRadius: 10,
  boxShadow: '0px 8px 24px -8px rgba(0, 0, 0, .15)',
  overflowY: 'auto',
});
