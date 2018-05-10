const router = require('express').Router();

const { Book } = require('../../db');
const { createAllRoutes } = require('./route-creators');

createAllRoutes(router, Book);

module.exports = router;
