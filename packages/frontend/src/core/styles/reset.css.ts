import { globalStyle } from '@vanilla-extract/css';

/***
    The new CSS reset - version 1.5.1 (last updated 1.3.2022)
    GitHub page: https://github.com/elad2412/the-new-css-reset
***/

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
 */
globalStyle(
  '*:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *))',
  {
    all: 'unset',
    display: 'revert',
  },
);

/* Preferred box-sizing value */
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

/* Reapply the pointer cursor for anchor tags */
globalStyle('a, button', {
  cursor: 'revert',
});

/* Remove list styles (bullets/numbers) */
globalStyle('ol, ul, menu', {
  listStyle: 'none',
});

/* For images to not be able to exceed their container */
globalStyle('img', {
  maxWidth: '100%',
});

/* removes spacing between cells in tables */
globalStyle('table', {
  borderCollapse: 'collapse',
});

/* revert the 'white-space' property for textarea elements on Safari */
globalStyle('textarea', {
  whiteSpace: 'revert',
});

/* minimum style to allow to style meter element */
globalStyle('meter', {
  WebkitAppearance: 'revert',
  appearance: 'revert',
});

/* reset default text opacity of input placeholder */
globalStyle('::placeholder', {
  color: 'unset',
});

/* fix the feature of 'hidden' attribute.
 display:revert; revert to element instead of attribute */
globalStyle(':where([hidden])', {
  display: 'none',
});

/* revert for bug in Chromium browsers
 - fix for the content editable attribute will work properly. */
globalStyle(':where([contenteditable])', {
  MozUserModify: 'read-write',
  WebkitUserModify: 'read-write',
  overflowWrap: 'break-word',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WebkitLineBreak: 'after-white-space' as any,
});

/* apply back the draggable feature - exist only in Chromium and Safari */
globalStyle(':where([draggable="true"])', {
  '-webkit-user-drag': 'element',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
