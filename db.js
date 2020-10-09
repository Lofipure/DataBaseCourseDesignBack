const mysql = require('mysql');// 引入模块

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "student_course_info",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connect mysql success!");
});

module.exports = connection;