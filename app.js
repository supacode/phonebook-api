const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config({
  path: './config.env',
});

const connectDb = require('./utils/connectDb');

const AppError = require('./utils/AppError');
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

app.use(mongoSanitize());

app.use(cors());

// test route
app.use('/api/v1/test', (req, res, next) => {
  console.log('test result');
  res.status(200).json({
    status: 'success',
    message: 'ok',
    time: `${Date.now()}`,
  });
});

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/contact', contactRoutes);

app.use(errorHandler);

app.all('*', (req, res, next) => {
  next(
    new AppError({
      statusCode: 404,
      message: `${req.originalUrl} doesnt exist!`,
    }),
  );
});

process.on('uncaughtException', err => {
  /* eslint-disable */
  console.log('UNCAUGHT EXCEPTION! 💥 Exiting Process');
  console.log(err.name, err.message);

  /* eslint-enable */
  process.exit(1);
});

module.exports = app;
