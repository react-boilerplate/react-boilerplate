// For vendors (f.e Lodash) just import them here unless
// you plan on chunking vendor files for async loading. You would need to import the
// async loaded vendors at the entry point of the async loaded file.

// Polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

// Vendor
import 'history';
import 'immutable';
import 'react';
import 'react-dom';
import 'react-pure-render';
import 'react-redux';
import 'react-router';
import 'react-router-redux';
import 'react-router-scroll';
import 'redux';
import 'redux-immutable';
import 'redux-saga';
import 'reselect';
