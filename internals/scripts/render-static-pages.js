// Most of this code is stolen from https://github.com/kriasoft/react-starter-kit
import cp from 'child_process';
import path from 'path';
import fetch from 'node-fetch';
import mkdirp from 'mkdirp';
import fs from 'fs';
import chalk from 'chalk';

import routes from '../../static-pages';

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', (err) => (err ? reject(err) : resolve()));
});

const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, (err) => (err ? reject(err) : resolve()));
});

function runServer() {
  const RUNNING_REGEXP = /Localhost: http:\/\/(.+)/;
  return new Promise((resolve) => {
    function onStdOut(data) {
      const match = data.toString('utf8').match(RUNNING_REGEXP);

      process.stdout.write(data);

      if (match) {
        server.host = match[1];

        server.stdout.removeListener('data', onStdOut);
        server.stdout.pipe(process.stdout);

        resolve(server);
      }
    }

    const server = cp.spawn('npm', ['run', '-s', 'start:prod']);
    server.stdout.on('data', onStdOut);
    server.stderr.pipe(process.stderr);
  });
}

async function main() {
  console.info(chalk.blue('Generating static pages'));
  const server = await runServer();

  await Promise.all(routes.map(async (route, index) => {
    const url = `http://${server.host}${route}`;
    const fileName = route.endsWith('/') ? 'index.html' : `${path.basename(route, '.html')}.html`;
    const dirName = path.join('build', route.endsWith('/') ? route : path.dirname(route));
    const target = path.join(dirName, fileName);
    const timeStart = new Date();
    const response = await fetch(url);
    const timeEnd = new Date();
    const text = await response.text();
    await makeDir(dirName);
    await writeFile(target, text);
    const time = timeEnd.getTime() - timeStart.getTime();
    console.info(`#${index + 1} ${chalk.green(target)} => ${response.status} ${response.statusText} (${time} ms)`);
  }));

  server.kill('SIGTERM');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
