const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');

const prettierExec = (prettierConfig, shouldWrite) => {
  const patterns = prettierConfig.patterns;
  const options = prettierConfig.options;
  const ignore = prettierConfig.ignore;

  const globPattern =
    patterns.length > 1 ? `{${patterns.join(',')}}` : `${patterns.join(',')}`;
  const files = glob.sync(globPattern, { ignore });

  let didError = false;
  const prettieredFiles = [];
  if (!files.length) {
    process.stdout.write('Prettier file pattern is empty.\n');
    return { didError, prettieredFiles };
  }

  files.forEach((file) => {
    try {
      const begainTime = new Date().getTime();
      let endTime = begainTime;
      const input = fs.readFileSync(file, 'utf8');
      if (shouldWrite) {
        const output = prettier.format(input, options);
        if (output !== input) {
          fs.writeFileSync(file, output, 'utf8');
          endTime = new Date().getTime();
          process.stdout.write(
            `Do prettier: ${file} ${endTime - begainTime}ms.\n`
          );
          prettieredFiles.push(file);
        } else {
          endTime = new Date().getTime();
          process.stdout.write(
            `Uneeds prettier: ${file} ${endTime - begainTime}ms.\n`
          );
        }
      } else if (!prettier.check(input, options)) {
        process.stdout.write(`Needs prettier: ${file}.\n`);
      }
    } catch (error) {
      didError = true;
      process.stdout.write(`Prettier ${file} error: ${error.message}.\n`);
    }
  });

  return { didError, prettieredFiles };
};

module.exports = prettierExec;
