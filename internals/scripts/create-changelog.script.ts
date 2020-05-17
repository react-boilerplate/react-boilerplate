import shell from 'shelljs';

interface Options {}

export function createChangeLog(opts: Options = {}) {
  const changes1 = shell.exec(`git diff package.json`, { silent: true });
  const changes2 = shell.exec(`git diff package-lock.json`, { silent: true });
  if (changes1.stdout.length > 0 || changes2.stdout.length > 0) {
    console.error('Error: Unstaged files');
    process.exit(1);
  }
  shell.exec(
    `npx standard-version --skip.commit --skip.tag --skip.changelog=0`,
    {
      silent: false,
    },
  );

  // Revert the bumbped version
  shell.exec(`git checkout -- package-lock.json`, { silent: true });
  shell.exec(`git checkout -- package.json`, { silent: true });
}

createChangeLog();
