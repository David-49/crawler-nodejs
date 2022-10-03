import mysql from "mysql";

const con = mysql.createConnection({
  host: "db",
  user: "user",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
