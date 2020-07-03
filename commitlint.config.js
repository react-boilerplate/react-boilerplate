// Use types from .versionrc.js so that when generating CHANGELOG there are no inconsistencies
const standardVersionTypes = require('./.versionrc').types;
const typeEnums = standardVersionTypes.map(t => t.type);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', typeEnums],
  },
};
