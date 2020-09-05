var commonDao = require('./commonDao');

var expenseDao = {
    async insertExpense(params) {
        var sql = 'insert into expense (expense_id, user_id, expense_date, description, amount, expense_type, status, create_date, create_by, update_date, update_by) values ?';
        const results = await commonDao.query(sql, [params]);
        return results;
    }
}

module.exports = expenseDao;