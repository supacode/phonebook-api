const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({
  path: './config.env'
});

const connectDb = require('./utils/connectDb');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

(async () => await connectDb())();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(helmet());

app.use(cookieParser());

app.use(cors());

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/contact', contactRoutes);
module.exports = app;
