const router = require('express').Router();

const { Author } = require('../../db');
const { createGetAllRoute } = require('./route-creators');

createGetAllRoute(router, Author);

module.exports = router;
