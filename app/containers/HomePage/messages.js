/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  'bounty.header': {
    id: 'bounty.header',
  },
  title: {
    id: 'bounty.HomePage.check_your_email.title',
  },
  message: {
    id: 'bounty.HomePage.check_your_email.message',
  },
  trymeHeader: {
    id: 'boilerplate.containers.HomePage.tryme.header',
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: 'boilerplate.containers.HomePage.tryme.message',
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: 'boilerplate.containers.HomePage.tryme.atPrefix',
    defaultMessage: '@',
  },
  initial_message: {
    id: 'bounty.initial_message',
  },
  not_on_list: {
    id: 'bounty.server.not-on-list',
  },
  no_token_given: {
    id: 'bounty.server.no-token-given',
  },
});
