import 'styled-components';
import { theme } from './theme';

type Theme = typeof theme;

/* This is the suggested way of declaring theme types */
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
