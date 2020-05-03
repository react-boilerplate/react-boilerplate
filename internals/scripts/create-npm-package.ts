import shell from 'shelljs';
import {
  crateTemplateFolder,
  removeTemplateFolder,
} from './create-template-folder';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

const packageName = require('../../package.json').name;
const packageVersion = require('../../package.json').version;
const packageFolder = `.${packageName}`;
interface Options {}

export function createNpmPackage(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  shell.rm('-rf', `${packageFolder}`);

  crateTemplateFolder(opts);

  shell.exec(`npm pack`, { silent: true });
  shell.exec(
    `tar -xvf ${packageName}-${packageVersion}.tgz && mv package ${packageFolder} && rm ${packageName}-${packageVersion}.tgz`,
    { silent: true },
  );

  removeTemplateFolder();

  if (abortOnFailEnabled) shellDisableAbortOnFail();
  return packageFolder;
}

export function removeNpmPackage() {
  shell.rm('-rf', `${packageFolder}`);
}
