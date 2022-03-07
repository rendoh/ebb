import { style } from '@vanilla-extract/css';
import { globalVars } from '../styles/globalTheme.css';

export const button = style({
  display: 'inline-block',
  background: globalVars.colors.primary,
  color: '#fff',
  borderRadius: 5,
  padding: '5px 10px',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s ease-out',
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        boxShadow: `0 5px 20px -5px rgba(${globalVars.colors.primaryRgb}, 1)`,
      },
    },
  },
});
