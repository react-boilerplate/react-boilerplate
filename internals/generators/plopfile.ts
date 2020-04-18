import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './component';
import { containerGenerator } from './container';
import { exec } from 'child_process';

interface CustomActionData {
  path: string;
  file?: string;
}

/**
 * Every generated backup file gets this extension
 */
export const BACKUPFILE_EXTENSION = 'rbgen';

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as CustomActionData;
    console.log('prettify path: ', data.path);
    exec(`npm run prettify -- "${data.path}"`);
    return '';
  });
}
