/**
 * @fileoverview Prevent usage of setState in componentWillUpdate
 * @author Yannick Croissant
 */
'use strict';

const makeNoMethodSetStateRule = require('../util/makeNoMethodSetStateRule');

module.exports = makeNoMethodSetStateRule('componentWillUpdate');
