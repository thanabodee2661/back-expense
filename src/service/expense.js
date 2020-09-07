const { v4: uuidv4 } = require('uuid');
const authService = require('../service/auth');
const dateUtil = require('../util/dateUtil');
const expenseDao = require('../dao/expenseDao');

var fn = {
    async saveExpense(expenseDetail) {
        try {
            const params = [];
            const createDate = dateUtil.getDateSql();
            const userProfile = authService.getUserProfile();
            expenseDetail.expenseDetailList.forEach(data => {
                const param = []
                param.push(uuidv4());
                param.push(userProfile.userId);
                param.push(dateUtil.getDateSqlFromNumber(data.expenseDate));
                param.push(data.description);
                param.push(data.amount);
                param.push(expenseDetail.expenseType);
                param.push('A');
                param.push(createDate);
                param.push(userProfile.userId);
                param.push(createDate);
                param.push(userProfile.userId);
                params.push(param);
            });
    
            const result = await expenseDao.insertExpense(params);
            return {
                status: 200,
                message: 'success'
            };
        } catch (err) {
            return {
                status: 500,
                message: err.message
            };
        }
    },

    async getExpenseList(expenseDetail) {
        try {
            const userProfile = authService.getUserProfile();
            const param = [];
            param.push(userProfile.userId);
            param.push(expenseDetail.expenseType);
            param.push(dateUtil.getDateToString(expenseDetail.expenseDate));
    
            const results = await expenseDao.getExpenseList(param);
            return {
                status: 200,
                content: results,
                message: 'success'
            };
        } catch (err) {
            return {
                status: 500,
                message: err.message
            }
        }
    }
};

module.exports = fn;