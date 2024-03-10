const mysql = require('mysql2');
//require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

db.connect((err)=>{
    if(err) throw err;
    console.log('Database connected');
});

module.exports = db;