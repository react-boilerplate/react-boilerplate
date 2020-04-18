import chalk from 'chalk';
import fs from 'fs';
import rimraf from 'rimraf';
import shell from 'shelljs';
import path from 'path';
import nodePlop from 'node-plop';

import { addCheckMark } from '../helpers/checkmark';
import { addXMark } from '../helpers/xmark';
import { BACKUPFILE_EXTENSION } from '../../generators/plopfile';
import { ComponentProptNames } from '../../generators/component';
import { ContainerProptNames } from '../../generators/container';
import { PlopGenerator } from '../typings/PlopGenerator';

if (process.env.TESTING_GENERATED_CRA) {
  process.chdir(
    path.join(__dirname, '../../../generated-cra-app/internals/generators'),
  );
} else {
  process.chdir(path.join(__dirname, '../../generators'));
}

const plop = nodePlop('./plopfile.ts');
const componentGen = plop.getGenerator('component') as PlopGenerator;
const containerGen = plop.getGenerator('container') as PlopGenerator;

const NAMESPACE = 'RbGenerated';

const componentsPath = path.join(process.cwd(), '../../src/app/components');
const containersPath = path.join(process.cwd(), '../../src/app/containers');
const rootStatePath = path.join(process.cwd(), '../../src/types/RootState.ts');

function runLinting() {
  return new Promise((resolve, reject) => {
    shell.exec(
      `npm run lint`,
      {
        silent: false, // so thats we can see the errors in the console
      },
      code => (code ? reject(new Error(`Linting failed!`)) : resolve()),
    );
  });
}

function removeComponent(name: string) {
  return rimraf.sync(path.join(componentsPath, name));
}

function removeContainer(name: string) {
  return rimraf.sync(path.join(containersPath, name));
}

async function handleResult({
  changes,
  failures,
}: {
  changes: [];
  failures: [];
}) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(failures) && failures.length > 0) {
      reject(new Error(JSON.stringify(failures, null, 2)));
    }
    resolve(changes);
  });
}
function feedbackToUser(info) {
  return (result?: any) => {
    console.info(chalk.blue(info));
    return result;
  };
}

function reportSuccess(message: string) {
  return result => {
    addCheckMark(() => console.log(chalk.green(` ${message}`)));
    return result;
  };
}

function reportErrors(reason: Error, shouldExist = true) {
  addXMark(() => console.error(chalk.red(` ${reason}`)));
  if (shouldExist) {
    process.exit(1);
  }
}
function restoreBackupFile(
  path: string,
  backupFileExtension = BACKUPFILE_EXTENSION,
) {
  const backupPath = path.concat(`.${backupFileExtension}`);
  fs.copyFileSync(backupPath, path);
  fs.unlinkSync(backupPath);
}

function backupFile(path: string, backupFileExtension = BACKUPFILE_EXTENSION) {
  const targetFile = path.concat(`.${backupFileExtension}`);
  fs.copyFileSync(path, targetFile);
  return targetFile;
}

async function generateComponent() {
  const componentName = `${NAMESPACE}Component`;

  await componentGen
    .runActions<ComponentProptNames>({
      ComponentName: componentName,
      wantMemo: true,
      wantStyledComponents: true,
      wantLoadable: true,
      wantTranslations: true,
    })
    .then(handleResult)
    .then(feedbackToUser(`Generated '${componentName}'`));

  // return a cleanup function
  return () => {
    removeComponent(componentName);
    feedbackToUser(`Cleaned '${componentName}'`)();
  };
}

async function generateContainer() {
  const componentName = `${NAMESPACE}Container`;

  backupFile(rootStatePath);

  await containerGen
    .runActions<ContainerProptNames>({
      ComponentName: componentName,
      wantMemo: true,
      wantHeaders: true,
      wantSaga: true,
      wantSlice: true,
      wantStyledComponents: true,
      wantLoadable: true,
      wantTranslations: true,
    })
    .then(handleResult)
    .then(feedbackToUser(`Generated '${componentName}'`));

  // return a cleanup function
  return () => {
    restoreBackupFile(rootStatePath);
    removeContainer(componentName);
    feedbackToUser(`Cleaned '${componentName}'`)();
  };
}

/**
 * Run
 */
(async function () {
  const componentCleanup = await generateComponent().catch(reason =>
    reportErrors(reason),
  );
  const containerCleanup = await generateContainer().catch(reason =>
    reportErrors(reason),
  );
  // Run lint when all the components are generated to see if they have any linting erros
  const lintingResult = await runLinting()
    .then(reportSuccess(`Linting test passed`))
    .catch(reason => {
      reportErrors(reason, false);
      return false;
    });

  // Everything is done, so run the cleanups synchronously
  for (const cleanup of [componentCleanup, containerCleanup]) {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  }

  if (lintingResult === false) {
    process.exit(1);
  }
})();
