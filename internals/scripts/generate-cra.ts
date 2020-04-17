import shell from 'shelljs';
import path from 'path';
import {
  generateTemplateFolder,
  removeTemplateFolder,
} from './generate-template-folder';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

interface Options {}

export function generateCRA(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  const craAppName = 'generated-cra-app';

  shell.rm('-rf', `${craAppName}`);

  generateTemplateFolder(opts);

  shell.echo('Generating CRA...');

  const child = shell.exec(
    `npx create-react-app ${craAppName} --template file:.`,
    {
      silent: false,
      async: true,
      fatal: true,
    },
  );
  child.on('exit', code => {
    shell.echo('Generating CRA finished!');

    removeTemplateFolder();
    if (code) {
      shell.rm('-rf', `${craAppName}`);
    }
  });

  if (abortOnFailEnabled) shellDisableAbortOnFail();
}

process.chdir(path.join(__dirname, '../..'));

generateCRA();
