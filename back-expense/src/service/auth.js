var jwt = require('jsonwebtoken');
var authDao = require('../dao/authDao');
var secretKey = 'namtanGG';

var fn = {
    generateToken(username) {
        return jwt.sign({
            username: username
        }, secretKey);
    },

    async checkUserInDb(username, password) {
        var results = await authDao.login(username, password);
        if(results.length > 0) {
            return {
                token: this.generateToken(results[0].username),
                status: 200
            };
        } else {
            return {
                message: 'username or password is wrong',
                status: 200
            };
        }
    }
};

module.exports = fn;