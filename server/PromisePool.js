const mysql = require('mysql2')

exports.pool = mysql.createPool(
    {
        host:     '127.0.0.1',
        port:     '3306',
        user:     'root',
        password: '******',
        database: 'sql-primer2'  // <== name of schema
    }).promise();

// exports.module = pool;