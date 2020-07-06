const { connect } = require('mongoose');

const DATABASE_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV
    : process.env.DB_PROD;

const connectDb = async (DB = DATABASE_URI) => {
  await connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

module.exports = connectDb;
