//decide which environment to use in knexfile.js
//export the final path to users-model.js
const knex = require('knex');

const knexfile = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[environment])