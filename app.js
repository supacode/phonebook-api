const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config({
  path: 'config.env'
});

module.exports = app;
