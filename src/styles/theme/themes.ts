const lightTheme = {
  primary: 'rgba(215, 113, 88, 1)',
  text: 'rgba(58, 52, 51, 1)',
  textSecondary: 'rgba(58, 52, 51, 0.7)',
  background: 'rgba(255, 255, 255, 1)',
  backgroundVariant: 'rgba(251, 249, 249, 1)',
  border: 'rgba(58, 52, 51, 0.12)',
  borderLight: 'rgba(58, 52, 51, 0.05)',
};

const darkTheme: Theme = {
  primary: 'rgba(200, 104, 21, 1)',
  text: 'rgba(241, 233, 231, 1)',
  textSecondary: 'rgba(241, 233, 231, 0.6)',
  background: 'rgba(0, 0, 0, 1)',
  backgroundVariant: 'rgba(28, 26, 26, 1)',
  border: 'rgba(241, 233, 231, 0.12)',
  borderLight: 'rgba(241, 233, 231, 0.5)',
};

export type Theme = typeof lightTheme;

export const themes = {
  default: lightTheme,
  dark: darkTheme,
};
