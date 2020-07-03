const internalSection = `Internals`;
/*
 * Used for creating CHANGELOG.md automatically.
 * Anything under the internalSection should be boilerplate internals
 * and shouldn't interest the end users, meaning that the template shouldn't be effected.
 */

// Check the descriptions of the types -> https://github.com/commitizen/conventional-commit-types/blob/master/index.json
module.exports = {
  types: [
    { type: 'feat', section: 'Features', hidden: false },
    { type: 'fix', section: 'Bug Fixes', hidden: false },
    { type: 'docs', section: 'Documentation', hidden: false },
    { type: 'perf', section: 'Performance Updates', hidden: false },

    // Other changes that don't modify src or test files
    { type: 'chore', section: internalSection, hidden: false },

    // Adding missing tests or correcting existing tests
    { type: 'test', section: internalSection, hidden: false },

    // Changes to our CI configuration files and scripts
    { type: 'ci', section: internalSection, hidden: false },

    // A code change that neither fixes a bug nor adds a feature
    { type: 'refactor', section: internalSection, hidden: false },

    // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    { type: 'style', section: internalSection, hidden: false },
  ],
  skip: {
    changelog: true,
  },
  commitAll: true,
};
