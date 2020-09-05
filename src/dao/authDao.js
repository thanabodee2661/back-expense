var commonDao = require('./commonDao');

var auth = {
    async checkUserAndPass(username, password) {
        var sql =   'select ' + 
                        'users_id as userId, ' +
                        'username, ' +
                        'firstname, ' +
                        'lastname, ' +
                        'email, ' + 
                        'tel, ' +
                        'status, ' +
                        'create_date as createDate ' +
                    'from users where username = ? and password = ?';
        var param = [];
        param.push(username);
        param.push(password);
        const results = await commonDao.query(sql, param);
        return results;
    },

    async checkUser(userId) {
        var sql = 'select * from users where users_id = ?';
        var param = [];
        param.push(userId);
        const results = await commonDao.query(sql, param);
        return results;
    }
}

module.exports = auth;