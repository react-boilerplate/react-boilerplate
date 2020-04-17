import shell from 'shelljs';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

interface Options {}

export function generateTemplateFolder(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  shell.echo('Generating template folder...');

  const copyToTemplate = (path: string, isRecursive?: boolean) => {
    if (isRecursive) {
      shell.cp('-r', path, `template/${path}`);
    } else {
      shell.cp(path, `template/${path}`);
    }
  };

  // Clean already generated one
  shell.rm('-rf', 'template');

  shell.mkdir('template');

  shell.mkdir('template/internals');
  copyToTemplate('internals/generators', true);
  copyToTemplate('internals/ts-node.tsconfig.json');
  shell.mkdir('template/internals/scripts');
  copyToTemplate('internals/scripts/clean.ts');
  copyToTemplate('internals/startingTemplate', true);

  copyToTemplate('.vscode', true);
  copyToTemplate('public', true);
  copyToTemplate('src', true);
  copyToTemplate('.env.local');
  copyToTemplate('.env.production');
  copyToTemplate('.eslintrc.js');
  copyToTemplate('.gitattributes');
  copyToTemplate('.gitignore');
  copyToTemplate('.npmrc');
  copyToTemplate('.nvmrc');
  copyToTemplate('.prettierignore');
  copyToTemplate('.prettierrc');
  copyToTemplate('.stylelintrc');
  copyToTemplate('tsconfig.json');

  shell.mv('template/.gitignore', 'template/gitignore');

  shell.echo('Generating template folder done!');
  if (abortOnFailEnabled) shellDisableAbortOnFail();
}

export function removeTemplateFolder() {
  shell.rm('-rf', 'template');
}
