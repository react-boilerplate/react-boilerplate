/* eslint-disable no-useless-escape */
export const required = (value) => (value ? null : 'Required');

export const url = (value) =>
  value && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(value)
    ? 'Invalid email address'
    : null;
