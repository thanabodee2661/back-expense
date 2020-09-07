var commonDao = require('./commonDao');

var expenseDao = {
    async insertExpense(params) {
        var sql = 'insert into expense (expense_id, user_id, expense_date, description, amount, expense_type, status, create_date, create_by, update_date, update_by) values ?';
        const results = await commonDao.query(sql, [params]);
        return results;
    },

    async getExpenseList(param) {
        var sql = 'select expense_id as expenseId, DATE_FORMAT(expense_date, "%d-%m-%Y") as expenseDate, description, amount ' +
                'from expense ' + 
                'where user_id = ? and expense_type = ? and DATE_FORMAT(expense_date, "%d-%m-%Y") = ?' +
                'order by expense_date';
        const results = await commonDao.query(sql, param);
        return results;
    }
}

module.exports = expenseDao;