const defaultTheme = {
  primary: '',
  componentBackground: '',
  componentBackgroundSecondary: '',
};

const darkTheme: Theme = {
  primary: '',
  componentBackground: '',
  componentBackgroundSecondary: '',
};

export type Theme = typeof defaultTheme;

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
};
