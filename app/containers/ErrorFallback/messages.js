/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

const scope = 'boilerplate.components.ErrorFallback';

export default defineMessages({
  info: {
    id: `${scope}.info`,
    defaultMessage: `
      Something bad happened.
    `,
  },
});
