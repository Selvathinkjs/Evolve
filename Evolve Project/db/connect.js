const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = con;
