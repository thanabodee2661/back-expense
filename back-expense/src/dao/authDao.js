var commonDao = require('./commonDao');

var auth = {
    async login(username, password) {
        var sql = 'select * from users where username = ? and password = ?';
        var param = [];
        param.push(username);
        param.push(password);
        const results = await commonDao.query(sql, param);
        return results;
    }
}

module.exports = auth;