var _ = require('lodash');
var googlediff = require('googlediff');
var seedrandom = require('seedrandom');
var diff = require('./diff.js');

googlediff = new googlediff();

var ITERATIONS = 10000;
var ALPHABET = 'GATTACA';
var LENGTH = 100;

var seed = Math.floor(Math.random() * 10000);
var random = seedrandom(seed);

console.log('Running computing ' + ITERATIONS + ' diffs with seed ' + seed + '...');

console.log('Generating strings...');
var strings = [];
for(var i = 0; i <= ITERATIONS; ++i) {
  var chars = [];
  for(var l = 0; l < LENGTH; ++l) {
    var letter = ALPHABET.substr(Math.floor(random() * ALPHABET.length), 1);
    chars.push(letter);
  }
  strings.push(chars.join(''));
}

console.log('Running tests *without* cursor information...');
for(var i = 0; i < ITERATIONS; ++i) {
  var result = diff(strings[i], strings[i+1]);
  var expected = googlediff.diff_main(strings[i], strings[i+1]);
  if (!_.isEqual(result, expected)) {
    console.log('Expected', expected);
    console.log('Result', result);
    throw new Error('Diff produced difference results.');
  }
}

console.log('Running tests *with* cursor information');
for(var i = 0; i < ITERATIONS; ++i) {
  var cursor_pos = Math.floor(random() * strings[i].length + 1);
  var diffs = diff(strings[i], strings[i+1], cursor_pos);
  var patch = googlediff.patch_make(strings[i], strings[i+1], diffs);
  var expected = googlediff.patch_apply(patch, strings[i])[0];
  if (expected !== strings[i+1]) {
    console.log('Expected', expected);
    console.log('Result', strings[i+1]);
    throw new Error('Diff produced difference results.');
  }
}

console.log('Running emoji tests');
(function() {
  var result = diff('🐶', '🐯');
  var expected = [
    [diff.DELETE, '🐶'],
    [diff.INSERT, '🐯'],
  ];
  if (!_.isEqual(result, expected)) {
    console.log(result, '!==', expected);
    throw new Error('Emoji simple case test failed');
  }
})();

(function() {
  var result = diff('👨🏽', '👩🏽');
  var expected = [
    [diff.DELETE, '👨'],
    [diff.INSERT, '👩'],
    [diff.EQUAL, '🏽']
  ];
  if (!_.isEqual(result, expected)) {
    console.log(result, '!==', expected);
    throw new Error('Emoji before case test failed');
  }
})();

(function() {
  var result = diff('👩🏼', '👩🏽');
  var expected = [
    [diff.EQUAL, '👩'],
    [diff.DELETE, '🏼'],
    [diff.INSERT, '🏽'],
  ];
  if (!_.isEqual(result, expected)) {
    console.log(result, '!==', expected);
    throw new Error('Emoji after case test failed');
  }
})();

console.log("Success!");
