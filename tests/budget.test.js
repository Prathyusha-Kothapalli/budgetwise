const RecurringManager = require('../js/recurringManager');
const CategoryLimits = require('../js/categoryLimits');
const BudgetCharts = require('../js/budgetCharts');

describe('BudgetWise Unit Tests', () => {
    test('RecurringManager sums monthly total', () => {
        const rm = new RecurringManager();
        rm.addRecurring('Salary', 5000, 'Income');
        rm.addRecurring('Freelance', 1000, 'Income');
        expect(rm.getMonthlyTotal()).toBe(6000);
    });

    test('CategoryLimits flags overspending', () => {
        const cl = new CategoryLimits();
        cl.setLimit('Dining', 200);
        const res = cl.checkSpending('Dining', 250);
        expect(res.exceeded).toBe(true);
        expect(res.overAmount).toBe(50);
    });
});