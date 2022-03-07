import { createGlobalTheme } from '@vanilla-extract/css';

export const globalVars = createGlobalTheme(':root', {
  colors: {
    primary: '#ff9f3d',
    primaryRgb: '255, 159, 61',
    text: '#202234',
    background: '#ffffff',
    error: '#ff3d3d',
    errorRgb: '255, 61, 61',
  },
});
