const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "excel"
    })
    db.connect(function (err) {
    if (err) {
    return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
     });