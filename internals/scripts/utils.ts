import shell from 'shelljs';

export function shellEnableAbortOnFail() {
  if (!shell.config.fatal) {
    shell.config.fatal = true;
    return true;
  }
  return false;
}

export function shellDisableAbortOnFail() {
  if (shell.config.fatal) {
    shell.config.fatal = false;
  }
}

export function parseArgv(argv: string[], key: string, existsOnly?: boolean) {
  const index = argv.indexOf(`--${key}`);
  if (index > 0) {
    if (existsOnly) {
      return true;
    }
    return argv[index + 1];
  }
  return undefined;
}
