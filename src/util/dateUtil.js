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
            if (typeof (value) !== 'number') {
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
            if (typeof (value) !== 'number') {
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
                date.setDate(date.getDate() + value)
            }
            return date;
        } else {
            return null;
        }
    },

    plusMonth(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setMonth(date.getMonth() + value)
            }
            return date;
        } else {
            return null;
        }
    },

    plusYear(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setFullYear(date.getFullYear() + value)
            }
            return date;
        } else {
            return null;
        }
    },

    subtractDate(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setDate(date.getDate() - value)
            }
            return date;
        } else {
            return null;
        }
    },

    subtractMonth(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setMonth(date.getMonth() - value)
            }
            return date;
        } else {
            return null;
        }
    },

    subtractYear(date, value) {
        if (date instanceof Date) {
            if (!isNaN(value)) {
                date.setFullYear(date.getFullYear() - value)
            }
            return date;
        } else {
            return null;
        }
    },

    subtractDateFromDate(date1, date2) {
        if (date1 instanceof Date && date2 instanceof Date) {
            if (date1.getTime() >= date2.getTime()) {
                return date1.getTime() - date2.getTime();
            } else {
                return date2.getTime() - date1.getTime();
            }
        } else {
            return null;
        }
    },

    convertMilliToTimeLeftString(milliDate = 0) {
        const milliDay = 24 * 60 * 60 * 1000;
        const milliHr = milliDay / 24;
        const milliMin = milliHr / 60;
        const milliSec = milliMin / 60;
        let obj = {
            milliDate: parseInt(milliDate/1000)*1000,
            text: ''
        }
        if (milliDate > 0) {
            calculateTimeLeft(obj, milliDay);
            if (obj.milliDate > 0) {
                calculateTimeLeft(obj, milliHr);
            }
            if (obj.milliDate > 0) {
                calculateTimeLeft(obj, milliMin);
            }
            if (obj.milliDate > 0) {
                calculateTimeLeft(obj, milliSec);
            }
        }
        return {
            milliDate: milliDate,
            text: obj.text
        };
    }
}

const calculateTimeLeft = (obj, dividerMilli) => {
    const unitDate = {
        [24 * 60 * 60 * 1000]: 'วัน',
        [60 * 60 * 1000]: 'ชั่วโมง',
        [60 * 1000]: 'นาที',
        1000: 'วินาที'
    };
    const resultValue = parseInt(obj.milliDate / dividerMilli);
    if (resultValue >= 1) {
        obj.milliDate = obj.milliDate % dividerMilli;
        obj.text += `${resultValue} ${unitDate[dividerMilli]} `;
        if (obj.milliDate === 0) {
            obj.text = obj.text.trim();
        }
    }
}

module.exports = dateUtil;