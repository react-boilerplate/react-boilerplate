export type ConvertedToFunctionsType<T> = {
  [P in keyof T]: T[P] extends string
    ? () => string
    : ConvertedToFunctionsType<T[P]>;
};
