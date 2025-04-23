require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD || null,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_HOST,
    port: process.env.DB_DEV_PORT,
    dialect: process.env.DB_DEV_DIALECT,
  },
}
