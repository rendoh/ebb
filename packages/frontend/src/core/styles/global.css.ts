import { globalStyle } from '@vanilla-extract/css';
import { globalVars } from './globalTheme.css';

globalStyle('body', {
  textSizeAdjust: '100%',
  lineHeight: 1.5,
  color: globalVars.colors.text,
  background: globalVars.colors.background,
  fontSize: 16,
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle(
  '*:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *))',
  {
    outline: 'revert',
  },
);

globalStyle('::placeholder', {
  color: '#ccc',
});
