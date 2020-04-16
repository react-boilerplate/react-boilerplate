/**
 * Component Generator
 */

import { Actions, PlopGenerator } from 'node-plop';
import path from 'path';

import { componentExists } from '../utils';

enum ProptNames {
  'ComponentName' = 'ComponentName',
  'wantMemo' = 'wantMemo',
  'wantStyledComponents' = 'wantStyledComponents',
  'wantTranslations' = 'wantTranslations',
  'wantLoadable' = 'wantLoadable',
}
const componentsPath = path.join(__dirname, '../../../src/app/components');

export const componentGenerator: PlopGenerator = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: ProptNames.ComponentName,
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component with this name already exists'
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
    const actions: Actions = [
      {
        type: 'add',
        path: `${componentsPath}/{{properCase ${ProptNames.ComponentName}}}/index.tsx`,
        templateFile: './component/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${componentsPath}/{{properCase ${ProptNames.ComponentName}}}/Loadable.ts`,
        templateFile: './component/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${componentsPath}/${data.ComponentName}/**` },
    });

    return actions;
  },
};
