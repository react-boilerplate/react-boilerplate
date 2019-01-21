'use strict';

var R_FONT_FACE = /\@font-face\s*\{([\s\S]*?)\}/g;
var R_CSS_PAIR = /\s*([a-zA-Z\-]+)\s*:\s*([\s\S]+?)\s*(?:;|$)/g;
var R_URL_SRC = /^\s*url\(([\s\S]*?)\)(?:\s+format\(([\s\S]*?)\))?\s*$/;

module.exports = function fontsCssLoader(response) {
  return response.text().then(function (text) {
    var fonts = parseStylesheet(text);
    var urls = extractFontURLs(fonts);

    return urls;
  });
};

function parseStylesheet(content) {
  var fonts = [];
  var face = undefined;

  if (!content) {
    return fonts;
  }

  while (face = R_FONT_FACE.exec(content)) {
    var font = {};
    var faceData = face[1].trim();
    var pair = undefined;

    while (pair = R_CSS_PAIR.exec(faceData)) {
      var prop = pair[1].replace('font-', '');
      var val = pair[2];

      if (prop === 'unicode-range') {
        font.unicodeRange = val;
      } else if (prop === 'feature-settings') {
        font.featureSettings = val;
      } else {
        font[prop] = prop === 'family' ? val.replace(/'|"/g, '') : val;
      }
    }

    fonts.push(font);
  }

  return fonts;
}

function extractFontURLs(fonts) {
  var urls = [];

  if (!fonts.length) {
    return urls;
  }

  fonts.forEach(function (font) {
    var sources = parseSources(font);
    if (!sources) return;

    sources.url.forEach(function (source) {
      source = parseUrlSource(source);

      if (source[0]) {
        urls.push(source[0]);
      }
    });
  });

  return urls;
}

function parseSources(font) {
  if (!font || !font.src) {
    return;
  }

  var sources = font.src.trim().split(/\s*,\s*/);

  var localSources = [];
  var urlSources = [];

  for (var i = 0, len = sources.length; i < len; i++) {
    var source = sources[i];

    if (source.indexOf('local') === 0) {
      localSources.push(source);
    } else {
      urlSources.push(source);
    }
  }

  return {
    local: localSources,
    url: urlSources
  };
}

function parseUrlSource(source) {
  var match = source && source.match(R_URL_SRC);

  if (!match) {
    return [];
  }

  return [match[1] && match[1].replace(/'|"/g, ''), match[2] && match[2].replace(/'|"/g, '')];
}