import 'styled-components';
import { defaultTheme } from './themes';

type Theme = typeof defaultTheme;

/* This is the suggested way of declaring theme types */
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
