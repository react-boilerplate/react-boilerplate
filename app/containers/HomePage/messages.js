/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Dovenmuehle Sample App',
  },
  body: {
    id: `${scope}.body`,
    defaultMessage: 'Body paragraph of the application.',
  },
});
