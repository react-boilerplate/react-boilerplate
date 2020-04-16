/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './component';

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

interface CustomActionData {
  path: string;
}

/**
 * Every generated backup file gets this extension
 */
export const BACKUPFILE_EXTENSION = 'rbgen';

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as CustomActionData;
    exec(`npm run prettify -- "${data.path}"`);
    return '';
  });
}
