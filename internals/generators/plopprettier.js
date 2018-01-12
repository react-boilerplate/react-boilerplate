const path = require('path');
const pkg = require('../../package.json');
const prettierexcutor = require('../scripts/helpers/prettierexcutor');

const preCheck = actionConfig => {
  let isActionConfigValid = false;
  if (typeof actionConfig !== 'object') {
    return isActionConfigValid;
  }

  const filePath = actionConfig.path;
  const isStringFilePath = typeof filePath === 'string';
  if (isStringFilePath) {
    isActionConfigValid = true;
  } else if (filePath.length > 0) {
    isActionConfigValid = true;
  }

  return isActionConfigValid;
};

const plopPrettier = (data, actionConfig, plp) => {
  let plopPrettierMessage;
  const validActionConfig = preCheck(actionConfig);

  if (!validActionConfig) {
    plopPrettierMessage = `Invalid action config: ${JSON.stringify(
      actionConfig
    )}.`;
    process.stderr.write(`${plopPrettierMessage}\n`);
    return plopPrettierMessage;
  }

  const prettierResult = [];
  const patterns = [];
  const pathForPrettier = actionConfig.path;

  if (typeof pathForPrettier === 'string') {
    patterns.push(
      path.join(__dirname, plp.renderString(pathForPrettier, data))
    );
  } else {
    pathForPrettier.forEach(plopedFilePath => {
      patterns.push(
        path.join(__dirname, plp.renderString(plopedFilePath, data))
      );
    });
  }

  const options = pkg.prettier;
  prettierResult.push(
    prettierexcutor(
      {
        options,
        patterns
      },
      true
    )
  );

  let didError = false;

  prettierResult.forEach(item => {
    didError = didError || item.didError;
  });

  plopPrettierMessage = didError
    ? `Plop prettier ${actionConfig.path} failed.`
    : 'Plop prettier successed.';
  process.stdout.write(`${plopPrettierMessage}\n`);
  return plopPrettierMessage;
};

module.exports = plopPrettier;
