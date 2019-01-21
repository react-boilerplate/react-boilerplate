#!/usr/bin/env node
'use strict';
const spawn = require('child_process').spawn;
const binPath = require('.');

spawn(binPath, process.argv.slice(2), {stdio: 'inherit'})
	.on('exit', process.exit);
