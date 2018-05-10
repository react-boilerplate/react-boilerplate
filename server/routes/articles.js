const router = require('express').Router();

const { Article } = require('../../db');
const { createAllRoutes } = require('./route-creators');

createAllRoutes(router, Article);

module.exports = router;
