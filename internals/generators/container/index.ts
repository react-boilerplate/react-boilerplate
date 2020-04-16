/**
 * Component Generator
 */

import { Actions, PlopGenerator } from 'node-plop';
import path from 'path';

import { containerExists } from '../utils';

enum ProptNames {
  'ComponentName' = 'ComponentName',
  'wantMemo' = 'wantMemo',
  'wantHeaders' = 'wantHeaders',
  'wantSlice' = 'wantSlice',
  'wantSaga' = 'wantSaga',
  'wantStyledComponents' = 'wantStyledComponents',
  'wantTranslations' = 'wantTranslations',
  'wantLoadable' = 'wantLoadable',
}

const containersPath = path.join(__dirname, '../../../src/app/containers');
const rootStatePath = path.join(__dirname, '../../../src/types/RootState.ts');

export const containerGenerator: PlopGenerator = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: ProptNames.ComponentName,
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return containerExists(value)
            ? 'A container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: ProptNames.wantMemo,
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: ProptNames.wantHeaders,
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: ProptNames.wantSlice,
      default: true,
      message:
        'Do you want a redux slice(actions/selectors/reducer) for this container?',
    },
    {
      type: 'confirm',
      name: ProptNames.wantSaga,
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: ProptNames.wantStyledComponents,
      default: true,
      message: 'Do you want to use styled-components?',
    },
    {
      type: 'confirm',
      name: ProptNames.wantTranslations,
      default: false,
      message:
        'Do you want i18n translations (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: ProptNames.wantLoadable,
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: (data: { [P in ProptNames]: string }) => {
    const containerPath = `${containersPath}/{{properCase ${ProptNames.ComponentName}}}`;

    const actions: Actions = [
      {
        type: 'add',
        path: `${containerPath}/index.tsx`,
        templateFile: './container/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantSlice) {
      actions.push({
        type: 'add',
        path: `${containerPath}/slice.ts`,
        templateFile: './container/slice.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${containerPath}/selectors.ts`,
        templateFile: './container/selectors.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${containerPath}/types.ts`,
        templateFile: './container/types.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: `${rootStatePath}`,
        pattern: new RegExp(/.*\/\/.*\[IMPORT NEW CONTAINERSTATE ABOVE\].+\n/),
        templateFile: './container/importContainerState.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: `${rootStatePath}`,
        pattern: new RegExp(/.*\/\/.*\[INSERT NEW REDUCER KEY ABOVE\].+\n/),
        templateFile: './container/appendRootState.hbs',
        abortOnFail: true,
      });
    }
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: `${containerPath}/saga.ts`,
        templateFile: './container/saga.ts.hbs',
        abortOnFail: true,
      });
    }
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${containerPath}/Loadable.ts`,
        templateFile: './component/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${containersPath}/${data.ComponentName}/**` },
    });

    return actions;
  },
};
