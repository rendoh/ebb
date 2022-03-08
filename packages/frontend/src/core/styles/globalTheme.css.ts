import { createGlobalTheme } from '@vanilla-extract/css';

export const globalVars = createGlobalTheme(':root', {
  colors: {
    primary: '#617bf3',
    primaryLight: '#f1f3fd',
    text: '#002851',
    background: '#ffffff',
    error: '#f16161',
    border: '#d6d6d6',
  },
});
