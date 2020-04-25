import shell from 'shelljs';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';
import { createNpmPackage, removeNpmPackage } from './create-npm-package';

interface Options {}

export function createCRAProject(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  const craAppName = '.generated-cra-app';

  shell.rm('-rf', `${craAppName}`);

  const npmPackageFolder = createNpmPackage(opts);

  shell.echo('Creating CRA...');

  const child = shell.exec(
    `npx create-react-app ${craAppName} --template file:${npmPackageFolder}`,
    {
      silent: false,
      async: true,
      fatal: true,
    },
  );
  child.on('exit', code => {
    shell.echo('Creating CRA finished!');

    removeNpmPackage();
    if (code) {
      shell.rm('-rf', `${craAppName}`);
    }
  });

  if (abortOnFailEnabled) shellDisableAbortOnFail();
}
