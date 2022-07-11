import { palette } from '@leafygreen-ui/palette';

const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    offwhite: '#fffed1',
    grays: {
      base: '#282c34',
    },
    reds: {
      base: '#4d0a05',
      light1: '#8a1a10',
      light2: '#b42619',
      light3: '#df3121',
    },
    blues: {
      light1: '#61dafb',
    },
    lg: palette,
  },
  typography: {
    fonts: {
      code: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
    },
  },
};

export type Theme = typeof theme;
export default theme;
