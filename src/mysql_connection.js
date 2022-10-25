import mysql from "mysql";

export const con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
