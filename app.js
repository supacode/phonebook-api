const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

dotenv.config({
  path: './config.env',
});

const connectDb = require('./utils/connectDb');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./controllers/errorHandler');

const app = express();

(async () => await connectDb())();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') app.use(compression());

app.use(helmet());

app.use(cookieParser());

app.use(cors());

// test route
app.use('/api/v1/test', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'ok',
  });
});

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/contact', contactRoutes);

app.use('*', errorHandler);

module.exports = app;
