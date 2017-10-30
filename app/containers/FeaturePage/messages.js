/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: 'Features',
  scaffoldingHeader: 'Quick scaffolding',
  scaffoldingMessage: `Automate the creation of components, containers, routes, selectors
  and sagas - and their tests - right from the CLI!`,
  feedbackHeader: 'Instant feedback',
  feedbackMessage: `
      Enjoy the best DX and code your app at the speed of thought! Your
    saved changes to the CSS and JS are reflected instantaneously
    without refreshing the page. Preserve application state even when
    you update something in the underlying code!
    `,
  stateManagementHeader: 'Predictable state management',
  stateManagementMessages: `
      Unidirectional data flow allows for change logging and time travel
    debugging.
    `,
  javascriptHeader: 'Next generation JavaScript',
  javascriptMessage: `Use template strings, object destructuring, arrow functions, JSX
    syntax and more, today.`,
  cssHeader: 'Features',
  cssMessage: 'Next generation CSS',
  routingHeader: 'Industry-standard routing',
  routingMessage: `
      Write composable CSS that's co-located with your components for
    complete modularity. Unique generated class names keep the
    specificity low while eliminating style clashes. Ship only the
    styles that are on the page for the best performance.
    `,
  networkHeader: 'Offline-first',
  networkMessage: `
      The next frontier in performant web apps: availability without a
      network connection from the instant your users load the app.
    `,
  intlHeader: 'Complete i18n Standard Internationalization & Pluralization',
  intlMessage:
    'Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.',
});
