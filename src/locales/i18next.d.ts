import { i18n, TFunction as OriginalTFunction } from 'i18next';

import { translations } from './i18n';

type TranslationsType = typeof translations;
type LanguageKeys = keyof TranslationsType;
type TranslationKeys = keyof TranslationsType['en']['translations'];

declare module 'i18next' {
  export interface i18n {
    changeLanguage(lng: LanguageKeys, callback?: Callback): Promise<TFunction>;
  }

  export interface TFunction extends OriginalTFunction {
    <
      TResult extends TFunctionResult = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TranslationKeys,
      options?: TOptions<TInterpolationMap> | string,
    ): TResult;
  }
}
