/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import PropTypes from 'prop-types';

const {
  bool,
  number,
  string,
  func,
  object,
  oneOf,
  shape,
  any,
  oneOfType,
} = PropTypes;
const localeMatcher = oneOf(['best fit', 'lookup']);
const narrowShortLong = oneOf(['narrow', 'short', 'long']);
const numeric2digit = oneOf(['numeric', '2-digit']);
const funcReq = func.isRequired;

export const intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,

  defaultLocale: string,
  defaultFormats: object,

  onError: func,
};

export const intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq,
};

export const intlShape = shape({
  ...intlConfigPropTypes,
  ...intlFormatPropTypes,
  formatters: object,
  now: funcReq,
});

export const messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string,
};

export const dateTimeFormatPropTypes = {
  localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),

  timeZone: string,
  hour12: bool,

  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long']),
};

export const numberFormatPropTypes = {
  localeMatcher,

  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,

  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number,
};

export const relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf([
    'second',
    'minute',
    'hour',
    'day',
    'month',
    'year',
    'second-short',
    'minute-short',
    'hour-short',
    'day-short',
    'month-short',
    'year-short',
  ]),
};

export const pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal']),
};
