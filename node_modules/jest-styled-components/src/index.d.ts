declare namespace jest {
  interface Options {
    media?: string;
    modifier?: string;
    supports?: string;
  }

  interface Matchers<R> {
    toHaveStyleRule(property: string, value: string | RegExp, options?: Options): R;
  }
}
