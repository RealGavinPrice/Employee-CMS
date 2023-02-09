

const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'MySQL1234',
    database: 'employee_db'
  },
  console.log(`Connected to the Employee Database.`)
);

module.exports = db;