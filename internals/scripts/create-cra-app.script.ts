import shell from 'shelljs';
import { createNpmPackage, removeNpmPackage } from './create-npm-package';
import replace from 'replace-in-file';
import fs from 'fs';

interface Options {}

export function createCRA(opts: Options = {}) {
  const app_name = 'generated-cra-app';
  shell.exec(`rm -rf ${app_name}`);

  const template = createNpmPackage();
  shell.exec(`npx create-react-app ${app_name} --template file:${template}`, {
    silent: false,
    fatal: true,
  });

  removeNpmPackage();

  fixHuskyBug();
}

function fixHuskyBug() {
  // husky changes directory to the example folder which we don't want
  // https://github.com/typicode/husky#monorepos
  // https://github.com/typicode/husky/issues/677
  const huskyLocalPath = '.git/hooks/husky.local.sh';
  if (!fs.existsSync(huskyLocalPath)) {
    return;
  }
  const options = {
    files: '.git/hooks/husky.local.sh',
    from: /cd.*/g,
    to: `cd "."`,
  };
  try {
    replace.sync(options);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

createCRA();
