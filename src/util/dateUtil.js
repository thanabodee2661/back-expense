const moment = require('moment');
const validate = require('./validate');

const dateUtil = {
    now() {
        return new Date();
    },

    getDateToString(value, format) {
        if (value instanceof Date) {
            const formatTemp = validate.isNotEmpty(format) ? format : 'DD-MM-YYYY';
            return moment().format(formatTemp);
        } else {
            return null;
        }
    },

    getDateToNumber(value) {
        if (value instanceof Date) {
            return value.getTime();
        } else {
            return null;
        }
    },

    getFirstDateOfMonth() {
        const date = this.now();
        date.setDate(1);

        return date;
    },

    getEndDateOfMonth() {
        const date = this.now();
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);

        return date;
    },

    getFirstDateOfYear() {
        const date = this.now();
        date.setMonth(0);
        date.setDate(1);

        return date;
    },

    getEndDateOfYear() {
        const date = this.now();
        date.setMonth(12);
        date.setDate(0);

        return date;
    },

    plusDate(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setDate(date.getDate + value)
            } else {
                return date;
            }
        } else {
            return null;
        }
    },

    plusMonth(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setMonth(date.getMonth + value)
            } else {
                return date;
            }
        } else {
            return null;
        }
    },

    plusYear(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setFullYear(date.getFullYear + value)
            } else {
                return date;
            }
        } else {
            return null;
        }
    },

    divineDate(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setDate(date.getDate - value)
            } else {
                return date;
            }
        } else {
            return null;
        }
    },

    divineMonth(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setMonth(date.getMonth - value)
            } else {
                return date;
            }
        } else {
            return null;
        }
    },

    divineYear(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setFullYear(date.getFullYear - value)
            } else {
                return date;
            }
        } else {
            return null;
        }
    },
}

module.exports = dateUtil;