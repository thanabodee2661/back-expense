var mysql = require('mysql');

var conn = mysql.createConnection({
    database: 'project-expense',
    port: 3307,
    host: 'localhost',
    user: 'root',
    password: 'root'
});

var common = {
    query(sql, param) {
        return new Promise((resolve, reject) => {
            conn.query(sql, param, (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = common;