const mysql = require('mysql')


const pool = mysql.createPool({
    connectionLimit :10,
    user : 'root',
    host : 'localhost',
    database : 'todo_app'
})


module.exports = pool;