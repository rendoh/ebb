import { style } from '@vanilla-extract/css';
import { globalVars } from '../styles/globalTheme.css';

export const field = style({
  selectors: {
    '& + &': {
      marginTop: 16,
    },
  },
});

export const label = style({
  marginBottom: 6,
  fontSize: 14,
  display: 'block',
  width: 'fit-content',
});

export const feedback = style({
  marginTop: 4,
  fontSize: 12,
  color: globalVars.colors.error,
});
