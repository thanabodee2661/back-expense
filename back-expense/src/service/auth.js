var jwt = require('jsonwebtoken');
var authDao = require('../dao/authDao');
var secretKey = 'namtanGG';

var fn = {
    generateToken(userDetail) {
        return jwt.sign({...userDetail}, secretKey);
    },

    async checkUserAndPassInDb(username, password) {
        const results = await authDao.checkUserAndPass(username, password);
        if(results.length > 0) {
            return {
                token: this.generateToken(results[0]),
                status: 200
            };
        } else {
            return {
                token: null,
                status: 200
            };
        }
    },

    async checkUserInDb(userId) {
        var results = await authDao.checkUser(userId);
        if(results.length > 0) {
            return {
                result: true,
                status: 200,
                message: 'success'
            };
        } else {
            return {
                result: false,
                status: 401,
                message: 'user unauthorize'
            };
        }
    }
};

module.exports = fn;