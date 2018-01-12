const glob = require('glob');
const chalk = require('chalk');
const prettier = require('prettier');
const fs = require('fs');

const prettierexcutor = (prettierConfig, shouldWrite) => {
  let didError = false;
  const prettieredFiles = [];
  const patterns = prettierConfig.patterns || [];
  const options = prettierConfig.options || {};
  const ignores = prettierConfig.ignores || [];

  const pattern =
    patterns.length > 1 ? `{${patterns.join(',')}}` : `${patterns.join(',')}`;
  const ignore =
    ignores.length > 1 ? `{${ignores.join(',')}}` : `${ignores.join(',')}`;

  process.stdout.write(
    chalk.grey(
      `Prettier excutor file pattern: ${pattern}, ignore: ${ignore}.\n`
    )
  );

  const files = glob.sync(pattern, { ignores });
  if (!files || !files.length) {
    process.stdout.write(chalk.red('No matched files found for prettier.\n'));

    return { didError, prettieredFiles };
  }

  files.forEach(file => {
    const begainTime = new Date().getTime();
    let endTime = begainTime;

    try {
      const input = fs.readFileSync(file, 'utf8');

      const isPrettier = prettier.check(input, options);
      if (isPrettier) {
        endTime = new Date().getTime();
        process.stdout.write(
          chalk.grey(`Uneeds prettier: ${file} ${endTime - begainTime}ms.\n`)
        );

        return;
      }
      if (shouldWrite) {
        const output = prettier.format(input, options);
        fs.writeFileSync(file, output, 'utf8');

        endTime = new Date().getTime();
        process.stdout.write(
          chalk.green(`Prettier writed: ${file} ${endTime - begainTime}ms.\n`)
        );

        prettieredFiles.push(file);
      } else {
        endTime = new Date().getTime();
        process.stdout.write(
          chalk.red(`Needs prettier: ${file} ${endTime - begainTime}ms.\n`)
        );
      }
    } catch (error) {
      didError = true;
      endTime = new Date().getTime();
      process.stdout.write(
        chalk.red(
          `Prettier ${file} error: ${error.message} ${endTime -
            begainTime}ms.\n`
        )
      );
    }
  });

  return { didError, prettieredFiles };
};

module.exports = prettierexcutor;
