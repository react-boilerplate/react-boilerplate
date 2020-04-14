import shell from 'shelljs';
import path from 'path';
import {
  generateTemplateFolder,
  removeTemplateFolder,
} from './generate-template-folder';
import {
  shellEnableAbortOnFail,
  shellDisableAbortOnFail,
  parseArgv,
} from './utils';

interface Options {
  forTesting?: boolean;
}

export function generateCRA(opts: Options = {}) {
  shell.echo('Generating CRA...');

  let abortOnFailEnabled = false;
  if (opts.forTesting) {
    abortOnFailEnabled = shellEnableAbortOnFail();
  }
  generateTemplateFolder();

  const craAppName = 'generated-cra-app';

  shell.rm('-rf', `${craAppName}`);

  const child = shell.exec(
    `npx create-react-app ${craAppName} --template file:.`,
    {
      silent: opts.forTesting,
      async: true,
      fatal: true,
    },
  );
  child.on('exit', code => {
    shell.echo('Generating CRA Done');

    removeTemplateFolder();
    if (code || opts.forTesting) {
      shell.rm('-rf', `${craAppName}`);
    }
  });

  if (abortOnFailEnabled) shellDisableAbortOnFail();
}

process.chdir(path.join(__dirname, '../..'));

generateCRA({
  forTesting: parseArgv(process.argv, 'forTesting', true) as boolean,
});
