const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();
var connection;

function handleDisconnect() {
    connection = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        insecureAuth: false,
        dateStrings: true,
    });

    connection.on('connection', function (connection) {
        console.log('DB Connection established');

        connection.on('error', function (err) {
            console.error(new Date(), 'MySQL error', err.code);
        });
        connection.on('close', function (err) {
            console.error(new Date(), 'MySQL close', err);
        });
    });
}

handleDisconnect();

module.exports = connection;