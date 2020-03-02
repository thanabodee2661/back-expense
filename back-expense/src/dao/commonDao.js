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
            conn.connect((err) => {
                if (err) reject(err)
                console.log('connect....');
                conn.query(sql, param, (err, results, fields) => {
                    if (err) reject(err)
                    conn.end((err) => {
                        if (err) reject(err)
                        console.log('disconnect....');
                        resolve(results);
                    });
                });
            });
        });
    }
}

module.exports = common;