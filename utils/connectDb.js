const { connect } = require('mongoose');

let DATABASE_URI;

if (process.env.NODE_ENV === 'production') {
  const {
    DB_PROD_URI,
    DB_PROD_USERNAME,
    DB_PROD_NAME,
    DB_PROD_PASSWORD,
  } = process.env;

  DATABASE_URI = DB_PROD_URI;

  DATABASE_URI = DATABASE_URI.replace('<username>', DB_PROD_USERNAME);
  DATABASE_URI = DATABASE_URI.replace('<password>', DB_PROD_PASSWORD);
  DATABASE_URI = DATABASE_URI.replace('<dbname>', DB_PROD_NAME);
} else if (process.env.NODE_ENV === 'development') {
  DATABASE_URI = process.env.DB_DEV;
}

const connectDb = async (DB = DATABASE_URI) => {
  await connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  console.log(`Connected to ${DB}`);
};

module.exports = connectDb;
