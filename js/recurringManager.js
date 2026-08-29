class RecurringManager {
    constructor() {
        this.items = [];
    }
    addRecurring(title, amount, category, frequency = 'MONTHLY') {
        const item = { id: Date.now(), title, amount, category, frequency };
        this.items.push(item);
        return item;
    }
    getMonthlyTotal() {
        return this.items.reduce((sum, item) => sum + item.amount, 0);
    }
}
if (typeof module !== 'undefined') module.exports = RecurringManager;