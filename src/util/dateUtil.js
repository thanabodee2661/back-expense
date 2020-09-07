const moment = require('moment');
const validate = require('./validate');

const formatDate = 'DD-MM-YYYY';
const formatDateTimeSql = 'YYYY-MM-DD HH:mm:ss';

const dateUtil = {
    now() {
        return new Date();
    },

    getDateToString(value, format = formatDate) {
        if (value instanceof Date) {
            return moment(value).format(format);
        } else if (!isNaN(value)) {
            if (typeof(value) !== 'number') {
                value = Number(value);
            }
            return moment(value).format(format);
        } else {
            return null;
        }
    },

    getDateSql(value = this.now()) {
        if (value instanceof Date) {
            return moment(value).format(formatDateTimeSql);
        } else {
            return null;
        }
    },

    getDateSqlFromNumber(value = this.getDateToNumber()) {
        if (!isNaN(value)) {
            if (typeof(value) !== 'number') {
                value = Number(value);
            }
            return moment(value).format(formatDateTimeSql);
        } else {
            return null;
        }
    },

    getDateToNumber(value = this.now()) {
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