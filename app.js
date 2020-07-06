const express = require('express');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

const connectDb = require('./utils/connectDb');

const authRoutes = require('./routes/authRoutes');

const app = express();

(async () => await connectDb())();

app.use(express.json());

app.use('/api/v1/user', authRoutes);

module.exports = app;
