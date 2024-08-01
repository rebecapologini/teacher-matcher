const { Pool } = require("pg");
require("dotenv").config();

const pgPool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST || "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const initializeDbConnection = (pool) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
    } else {
      client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
          console.error("Error executing query", err.stack);
        } else {
          console.log("Connected to PostgreSQL at:", result.rows[0].now);
        }
      });
    }
  });
};

module.exports = { pgPool, initializeDbConnection };
