//      
'use strict';

const parseJson = require('parse-json');
const yaml = require('js-yaml');

function loadJs(filepath        )         {
  const result = require(filepath);
  return result;
}

function loadJson(filepath        , content        )         {
  try {
    return parseJson(content);
  } catch (err) {
    err.message = `JSON Error in ${filepath}:\n${err.message}`;
    throw err;
  }
}

function loadYaml(filepath        , content        )         {
  return yaml.safeLoad(content, { filename: filepath });
}

module.exports = {
  loadJs,
  loadJson,
  loadYaml,
};
