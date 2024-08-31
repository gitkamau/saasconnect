const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    enableArithAbort: true
  }
};

const poolPromise = sql.connect(dbConfig)
  .then(pool => {
    if (pool.connected) {
      console.log('Connected to SQL Server');
    }
    return pool;
  })
  .catch(err => {
    console.error('SQL connection error:', err);
  });

module.exports = poolPromise;
