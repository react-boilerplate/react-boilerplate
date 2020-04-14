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

type ThemesDict = { [key: string]: Theme };
export const themes: ThemesDict = {
  default: defaultTheme,
  dark: darkTheme,
};
