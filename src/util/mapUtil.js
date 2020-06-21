const validate = require('./validate');
const map = {
    getString = (obj, key, def) => {
        if (typeof(obj[key]) === 'string') {
            return validate.isEmpty(obj[key]) ? validate.isEmpty(def) ? null : def : obj[key];
        } else {
            return null;
        }
    },

    getNumber = (obj, key) => {
        if (typeof(obj[key]) === 'number') {
            return validate.isEmpty(obj[key]) ? 0 : obj[key];
        } else {
            return null;
        }
    },

    getDate = (obj, key) => {
        try {
            if (obj[key] instanceof Date) {
                return obj[key];
            } else {
                return validate.isEmpty(obj[key]) ? null : new Date(obj[key]);
            }
        } catch (e) {
            return null;
        }
    }
}

module.exports = map;