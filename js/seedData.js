/* BudgetWise Demo Data Seeding Engine */
import { APP_CONFIG } from './config.js';

export function generateSeedData() {
  const transactions = [];
  const now = new Date();
  
  // Helper date offset
  const getDateDaysAgo = (monthsAgo, dayOfMonth, hour = 12) => {
    const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, dayOfMonth, hour);
    return d.toISOString();
  };

  // Base income template per month for 12 months
  for (let m = 11; m >= 0; m--) {
    // Regular Salary on 1st of month
    transactions.push({
      id: `seed_tx_inc_${m}_1`,
      description: 'Monthly Salary - Acme Corp',
      amount: 5400.00,
      type: 'income',
      category: 'Salary',
      source: 'Salary',
      date: getDateDaysAgo(m, 1, 9),
      notes: 'Direct deposit monthly paycheck'
    });

    // Occasional Freelance / Side income
    if (m % 2 === 0) {
      transactions.push({
        id: `seed_tx_inc_${m}_2`,
        description: 'UI/UX Design Consulting Project',
        amount: 850.00 + (m * 25),
        type: 'income',
        category: 'Freelance',
        source: 'Freelance',
        date: getDateDaysAgo(m, 14, 15),
        notes: 'Client milestone payment'
      });
    }

    if (m === 0 || m === 6) {
      transactions.push({
        id: `seed_tx_inc_${m}_3`,
        description: 'Performance Bonus',
        amount: 1200.00,
        type: 'income',
        category: 'Bonuses & Gifts',
        source: 'Bonus',
        date: getDateDaysAgo(m, 20, 11),
        notes: 'Mid-year performance reward'
      });
    }

    // EXPENSES per month
    // 1. Bills & Utilities
    transactions.push({
      id: `seed_tx_exp_${m}_rent`,
      description: 'Apartment Rent Payment',
      amount: 1450.00,
      type: 'expense',
      category: 'Bills',
      date: getDateDaysAgo(m, 2, 10),
      notes: 'Monthly apartment rent auto-pay'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_wifi`,
      description: 'Gigabit Fiber Internet',
      amount: 79.99,
      type: 'expense',
      category: 'Bills',
      date: getDateDaysAgo(m, 5, 14),
      notes: 'Monthly internet subscription'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_util`,
      description: 'Electric & Power Grid',
      amount: 115.50 + ((m % 4) * 15),
      type: 'expense',
      category: 'Utilities',
      date: getDateDaysAgo(m, 8, 16),
      notes: 'Municipal utility bill'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_stream`,
      description: 'Netflix & Spotify Premium',
      amount: 28.98,
      type: 'expense',
      category: 'Bills',
      date: getDateDaysAgo(m, 12, 8),
      notes: 'Digital media bundle'
    });

    // 2. Food & Dining
    transactions.push({
      id: `seed_tx_exp_${m}_groc1`,
      description: 'Whole Foods Market',
      amount: 165.40 + (m * 4),
      type: 'expense',
      category: 'Food',
      date: getDateDaysAgo(m, 4, 18),
      notes: 'Weekly organic groceries'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_groc2`,
      description: 'Trader Joe\'s Grocery',
      amount: 142.10,
      type: 'expense',
      category: 'Food',
      date: getDateDaysAgo(m, 18, 17),
      notes: 'Pantry items & produce'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_dine1`,
      description: 'Artisan Bistro Dinner',
      amount: 88.50,
      type: 'expense',
      category: 'Food',
      date: getDateDaysAgo(m, 11, 20),
      notes: 'Weekend dinner with friends'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_coffee`,
      description: 'Blue Bottle Coffee & Bakery',
      amount: 32.75,
      type: 'expense',
      category: 'Food',
      date: getDateDaysAgo(m, 22, 9),
      notes: 'Morning coffee & pastries'
    });

    // 3. Travel & Transportation
    transactions.push({
      id: `seed_tx_exp_${m}_gas`,
      description: 'Chevron Gas Station',
      amount: 54.20,
      type: 'expense',
      category: 'Travel',
      date: getDateDaysAgo(m, 7, 12),
      notes: 'Fuel refill'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_uber`,
      description: 'Uber Rideshare Transit',
      amount: 36.80,
      type: 'expense',
      category: 'Travel',
      date: getDateDaysAgo(m, 19, 23),
      notes: 'Airport commute'
    });

    // 4. Shopping & Retail
    transactions.push({
      id: `seed_tx_exp_${m}_shop1`,
      description: 'Amazon Electronics & Accessories',
      amount: 124.90,
      type: 'expense',
      category: 'Shopping',
      date: getDateDaysAgo(m, 10, 15),
      notes: 'Office ergonomics supplies'
    });

    transactions.push({
      id: `seed_tx_exp_${m}_shop2`,
      description: 'Apparel Store Outlet',
      amount: 89.00,
      type: 'expense',
      category: 'Shopping',
      date: getDateDaysAgo(m, 24, 16),
      notes: 'Workwear wardrobe update'
    });

    // 5. Healthcare & Education & Entertainment
    if (m % 3 === 0) {
      transactions.push({
        id: `seed_tx_exp_${m}_health`,
        description: 'CVS Pharmacy & Dental Care',
        amount: 110.00,
        type: 'expense',
        category: 'Healthcare',
        date: getDateDaysAgo(m, 15, 11),
        notes: 'Prescription & routine checkup co-pay'
      });
    }

    if (m % 4 === 0) {
      transactions.push({
        id: `seed_tx_exp_${m}_edu`,
        description: 'Frontend Masters & Technical Books',
        amount: 65.00,
        type: 'expense',
        category: 'Education',
        date: getDateDaysAgo(m, 16, 14),
        notes: 'Skill development subscription'
      });
    }

    transactions.push({
      id: `seed_tx_exp_${m}_ent`,
      description: 'Cinema Night & Gaming Pass',
      amount: 45.00,
      type: 'expense',
      category: 'Entertainment',
      date: getDateDaysAgo(m, 26, 21),
      notes: 'Weekend movie tickets'
    });
  }

  // Monthly Budgets
  const budgets = [
    { id: 'b_food', category: 'Food', limit: 750, period: 'monthly' },
    { id: 'b_entertainment', category: 'Entertainment', limit: 250, period: 'monthly' },
    { id: 'b_shopping', category: 'Shopping', limit: 450, period: 'monthly' },
    { id: 'b_bills', category: 'Bills', limit: 1700, period: 'monthly' }
  ];

  // Savings Goals
  const goals = [
    {
      id: 'g_emergency',
      name: 'Emergency Fund',
      targetAmount: 12000,
      currentAmount: 9400,
      targetDate: '2026-12-31',
      category: 'Safety',
      icon: 'shield'
    },
    {
      id: 'g_vacation',
      name: 'European Summer Trip',
      targetAmount: 4500,
      currentAmount: 3200,
      targetDate: '2027-06-15',
      category: 'Travel',
      icon: 'plane'
    },
    {
      id: 'g_laptop',
      name: 'Next-Gen Laptop Upgrade',
      targetAmount: 2400,
      currentAmount: 2050,
      targetDate: '2026-11-01',
      category: 'Tech',
      icon: 'laptop'
    },
    {
      id: 'g_car',
      name: 'Car Down Payment',
      targetAmount: 8500,
      currentAmount: 4600,
      targetDate: '2027-04-30',
      category: 'Vehicle',
      icon: 'car'
    },
    {
      id: 'g_retirement',
      name: 'Index Fund Seed',
      targetAmount: 20000,
      currentAmount: 15800,
      targetDate: '2028-12-31',
      category: 'Investing',
      icon: 'trending-up'
    }
  ];

  // Recurring Bills
  const recurring = [
    {
      id: 'rec_salary',
      description: 'Monthly Acme Corp Paycheck',
      amount: 5400,
      type: 'income',
      category: 'Salary',
      frequency: 'monthly',
      dayOfMonth: 1,
      nextDueDate: getDateDaysAgo(-1, 1)
    },
    {
      id: 'rec_rent',
      description: 'Apartment Rent',
      amount: 1450,
      type: 'expense',
      category: 'Bills',
      frequency: 'monthly',
      dayOfMonth: 2,
      nextDueDate: getDateDaysAgo(-1, 2)
    },
    {
      id: 'rec_internet',
      description: 'Fiber Broadband Internet',
      amount: 79.99,
      type: 'expense',
      category: 'Bills',
      frequency: 'monthly',
      dayOfMonth: 5,
      nextDueDate: getDateDaysAgo(-1, 5)
    },
    {
      id: 'rec_gym',
      description: 'Fitness Club Membership',
      amount: 49.00,
      type: 'expense',
      category: 'Healthcare',
      frequency: 'monthly',
      dayOfMonth: 15,
      nextDueDate: getDateDaysAgo(0, 15)
    }
  ];

  // Notifications
  const notifications = [
    {
      id: 'notif_1',
      title: 'Food Budget Notice',
      message: 'You have reached 82% of your monthly Food & Dining budget limit.',
      type: 'warning',
      read: false,
      timestamp: new Date().toISOString()
    },
    {
      id: 'notif_2',
      title: 'Upcoming Bill Due',
      message: 'Apartment Rent ($1,450.00) is scheduled in 2 days.',
      type: 'info',
      read: false,
      timestamp: new Date().toISOString()
    },
    {
      id: 'notif_3',
      title: 'Milestone Reached!',
      message: 'Your Next-Gen Laptop Upgrade savings goal is now 85% completed!',
      type: 'success',
      read: true,
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ];

  return {
    user: APP_CONFIG.DEMO_USER,
    transactions,
    budgets,
    goals,
    recurring,
    notifications,
    settings: {
      currency: 'USD',
      theme: 'dark',
      emailAlerts: true,
      autoSeedOnReset: true
    }
  };
}
