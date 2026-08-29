class BudgetCharts {
    static getCategoryPercentages(expenses) {
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        if (total === 0) return [];

        const catMap = {};
        expenses.forEach(e => {
            catMap[e.category] = (catMap[e.category] || 0) + e.amount;
        });

        return Object.keys(catMap).map(cat => ({
            category: cat,
            amount: catMap[cat],
            percentage: ((catMap[cat] / total) * 100).toFixed(1)
        }));
    }
}
if (typeof module !== 'undefined') module.exports = BudgetCharts;