/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

const scope = 'boilerplate.components.ErrorBoundary';

export default defineMessages({
  error: {
    id: `${scope}.error`,
    defaultMessage: `
      Something bad happened.
    `,
  },
});
