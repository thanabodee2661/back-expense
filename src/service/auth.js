var jwt = require('jsonwebtoken');
var authDao = require('../dao/authDao');
var { isNotEmpty } = require('../util/validate');
var secretKey = 'namtanGG';
var userProfile = {
    "userId": "",
    "username": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "tel": "",
    "status": "",
    "createDate": "",
    "iat": ""
};

var fn = {
    generateToken(userDetail) {
        return jwt.sign({...userDetail}, secretKey);
    },

    getUserProfile() {
        return userProfile;
    },

    setUserProfile(req) {
        if (isNotEmpty(req.headers.authorization)){
            const token = req.headers.authorization.replace('Bearer ', '')
            userProfile = jwt.verify(token, secretKey);
        }
    },

    async checkUserAndPassInDb(username, password) {
        try {
            const results = await authDao.checkUserAndPass(username, password);
            if(results.length > 0) {
                return {
                    token: this.generateToken(results[0]),
                    status: 200,
                    message: 'success'
                };
            } else {
                return {
                    token: null,
                    status: 200,
                    message: 'Users not found'
                };
            }
        } catch (err) {
            return {
                token: null,
                status: 500,
                message: err.message
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