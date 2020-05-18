import shell from 'shelljs';
import fs from 'fs';

interface Options {}

/*
 * Check if the changed files are also updated if they are in the startingTemplate
 */
export function verifyStartingTemplateChanges(opts: Options = {}) {
  const gitDiff = shell.exec(`git diff --staged --name-only`, { silent: true });
  const changedFiles = gitDiff.stdout.split('\n');
  for (const file of changedFiles) {
    if (file.startsWith(pathInTemplate(''))) {
      continue;
    }
    if (fileIsInStartingTemplate(file)) {
      const fileNotChangedInStartingTemplate =
        changedFiles.find(f => f === pathInTemplate(file)) === undefined;
      if (fileNotChangedInStartingTemplate) {
        console.error(`File: ${file} must be updated in the startingTemplate`);
        process.exit(1);
      }
    }
  }
}

function fileIsInStartingTemplate(file: string) {
  const path = pathInTemplate(file);
  return fs.existsSync(path) && !fs.statSync(path).isDirectory();
}

const pathInTemplate = (file: string) => `internals/startingTemplate/${file}`;

verifyStartingTemplateChanges();
