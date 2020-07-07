const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config({
  path: './config.env'
});

const connectDb = require('./utils/connectDb');

const authRoutes = require('./routes/authRoutes');

const app = express();

(async () => await connectDb())();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(helmet());

app.use('/api/v1/user', authRoutes);

module.exports = app;
