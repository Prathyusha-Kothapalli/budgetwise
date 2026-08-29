class CategoryLimits {
    constructor() {
        this.limits = {};
    }
    setLimit(category, maxAmount) {
        this.limits[category] = maxAmount;
    }
    checkSpending(category, currentSpent) {
        const limit = this.limits[category];
        if (!limit) return { exceeded: false };
        return {
            exceeded: currentSpent > limit,
            limit,
            currentSpent,
            overAmount: Math.max(0, currentSpent - limit)
        };
    }
}
if (typeof module !== 'undefined') module.exports = CategoryLimits;