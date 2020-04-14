import shell from 'shelljs';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

interface Options {
  forTesting?: boolean;
}
export function generateTemplateFolder(opts: Options = {}) {
  let abortOnFailEnabled = false;
  if (opts.forTesting) {
    abortOnFailEnabled = shellEnableAbortOnFail();
  }

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

  copyToTemplate('public', true);
  copyToTemplate('src', true);
  copyToTemplate('.env.local');
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

  shell.echo('Done');
  if (abortOnFailEnabled) shellDisableAbortOnFail();
}

export function removeTemplateFolder() {
  shell.rm('-rf', 'template');
}
