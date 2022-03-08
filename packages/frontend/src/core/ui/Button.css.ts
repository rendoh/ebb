import { recipe } from '@vanilla-extract/recipes';
import { globalVars } from '../styles/globalTheme.css';

export const button = recipe({
  base: {
    display: 'inline-block',
    background: globalVars.colors.primaryLight,
    color: globalVars.colors.primary,
    borderRadius: 100,
    padding: '8px 16px',
    transition: 'box-shadow 0.2s ease-out',
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          boxShadow: `0 5px 20px -5px rgba(0, 0, 0, 0.1)`,
        },
      },
    },
  },
  variants: {
    submit: {
      true: {
        display: 'block',
        width: 'fit-content',
        margin: 'auto',
        minWidth: 100,
        textAlign: 'center',
      },
    },
  },
});
