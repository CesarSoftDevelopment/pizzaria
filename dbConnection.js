const pg = require('pg');
const pool = new pg.Pool({
  connectionString: "postgres://cngqppgnfznvyo:9f2cafe4bbc2019e3fcd39c2dc9d8135ccd2e6f3a7ef8c0dd9229645d7e9ef36@ec2-54-86-224-85.compute-1.amazonaws.com:5432/d2uqktmvaustqm",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;