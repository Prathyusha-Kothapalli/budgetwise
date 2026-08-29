/* BudgetWise Constants & Category Definitions */

export const APP_CONFIG = {
  NAME: 'BudgetWise',
  VERSION: '1.0.0',
  DEMO_USER: {
    email: 'demo@budgetwise.com',
    password: 'Demo@123',
    name: 'Alex Morgan',
    currency: 'USD',
    theme: 'dark'
  },
  STORAGE_KEYS: {
    USER: 'budgetwise_user',
    TRANSACTIONS: 'budgetwise_transactions',
    BUDGETS: 'budgetwise_budgets',
    GOALS: 'budgetwise_goals',
    RECURRING: 'budgetwise_recurring',
    NOTIFICATIONS: 'budgetwise_notifications',
    SETTINGS: 'budgetwise_settings',
    SEEDED: 'budgetwise_seeded_v1'
  }
};

export const CATEGORIES = {
  Food: {
    id: 'Food',
    name: 'Food & Dining',
    color: '#f59e0b',
    icon: 'utensils'
  },
  Travel: {
    id: 'Travel',
    name: 'Travel & Transport',
    color: '#3b82f6',
    icon: 'plane'
  },
  Shopping: {
    id: 'Shopping',
    name: 'Shopping & Retail',
    color: '#ec4899',
    icon: 'shopping-bag'
  },
  Bills: {
    id: 'Bills',
    name: 'Bills & Subscriptions',
    color: '#ef4444',
    icon: 'receipt'
  },
  Healthcare: {
    id: 'Healthcare',
    name: 'Healthcare & Wellness',
    color: '#10b981',
    icon: 'activity'
  },
  Education: {
    id: 'Education',
    name: 'Education & Courses',
    color: '#8b5cf6',
    icon: 'book-open'
  },
  Entertainment: {
    id: 'Entertainment',
    name: 'Entertainment & Leisure',
    color: '#06b6d4',
    icon: 'film'
  },
  Utilities: {
    id: 'Utilities',
    name: 'Utilities & Home',
    color: '#6366f1',
    icon: 'zap'
  }
};

export const INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Investments',
  'Rental Income',
  'Side Business',
  'Bonuses & Gifts',
  'Other Income'
];

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
};
