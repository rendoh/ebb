import { style, styleVariants } from '@vanilla-extract/css';
import { globalVars } from '../styles/globalTheme.css';

const base = style({
  border: `1px solid ${globalVars.colors.primary}`,
  padding: '8px 12px',
  width: '100%',
  borderRadius: 5,
  background: '#fff',
  transition: 'box-shadow 0.2s ease-out',
});

export const input = styleVariants({
  normal: [
    base,
    {
      border: `1px solid ${globalVars.colors.primary}`,
      ':focus': {
        boxShadow: `0 5px 20px -5px rgba(${globalVars.colors.primaryRgb}, 0.3)`,
      },
    },
  ],
  error: [
    base,
    {
      border: `1px solid ${globalVars.colors.error}`,
      ':focus': {
        boxShadow: `0 5px 20px -5px rgba(${globalVars.colors.errorRgb}, 0.3)`,
      },
    },
  ],
});
