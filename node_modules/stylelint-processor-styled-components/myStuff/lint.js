const stylelint = require('stylelint');
// const stylelint = require('../../stylelint');
const path = require('path');

const processor = path.join(__dirname, '../src/index.js');
const rules = {
  'block-no-empty': true,
  'declaration-block-no-duplicate-properties': true,
  indentation: 2,
};

const file = path.join(__dirname, 'styles.js');

stylelint
.lint({
  files: [file],
  syntax: 'scss',
  config: {
    processors: [processor],
    rules,
  },
})
.then(result => {
  console.log(result);
  console.log(result.results[0]);
  console.log(result.results[0]._postcssResult.css);
})
.catch(err => {
  console.log("ERROR");
  console.log(err);
});
