import { style, styleVariants } from '@vanilla-extract/css';
import { globalVars } from '../styles/globalTheme.css';

const base = style({
  border: `1px solid ${globalVars.colors.border}`,
  padding: '8px 12px',
  width: '100%',
  borderRadius: 5,
  background: globalVars.colors.primaryLight,
  transition: 'box-shadow 0.2s ease-out',
  outline: 'none',
  ':focus': {
    borderColor: globalVars.colors.primary,
  },
});

export const input = styleVariants({
  normal: [base],
  error: [
    base,
    {
      border: `1px solid ${globalVars.colors.error}`,
      ':focus': {
        borderColor: globalVars.colors.error,
      },
    },
  ],
});
