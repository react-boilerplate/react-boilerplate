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
 * @type {string}
 */
export const BACKUPFILE_EXTENSION = 'rbgen';

export default function plop(plop: NodePlopAPI) {
  console.log('plop started');
  plop.setGenerator('component', componentGenerator);
  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as CustomActionData;
    console.log('config:', data);
    // const folderPath = `${path.join(
    //   __dirname,
    //   '/../../app/',
    //   config.path,
    //   plop.getHelper('properCase')(answers.name),
    //   '**.ts*',
    // )}`;
    exec(`npm run prettify -- "${data.path}"`);
    return '';
  });
}
