const mysql = require('mysql2');
const dotenv = require('dotenv');

const config ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};

const db = mysql.createConnection(config);

db.connect((err) => {
    if (err) {
        console.log(err); 
    }
    console.log('Connected to MySQL database'); 
});

module.exports = db;