/* BudgetWise Extended Enterprise Historical Dataset Engine */
import { generateId } from '../utils.js';

export function generateExtendedHistoricalDataset() {
  const transactions = [];
  const now = new Date();

  const merchants = {
    Food: [
      { desc: 'Whole Foods Organic Groceries', range: [80, 220] },
      { desc: 'Trader Joe\'s Grocery Market', range: [45, 130] },
      { desc: 'Starbucks Coffee & Snacks', range: [6, 24] },
      { desc: 'Sweetgreen Salad & Warm Bowls', range: [14, 28] },
      { desc: 'Chipotle Mexican Grill', range: [12, 32] },
      { desc: 'Artisan Italian Trattoria', range: [65, 180] },
      { desc: 'Uber Eats Food Delivery', range: [22, 55] },
      { desc: 'Local Farmers Market Produce', range: [30, 85] }
    ],
    Travel: [
      { desc: 'Chevron Gas Refill Station', range: [35, 75] },
      { desc: 'Shell Oil & Transit Station', range: [40, 70] },
      { desc: 'Uber Rideshare Airport Commute', range: [18, 65] },
      { desc: 'Delta Air Lines Flight Ticket', range: [180, 520] },
      { desc: 'BART Metro Rail Pass', range: [25, 80] },
      { desc: 'Marriott Bonvoy Hotel Booking', range: [140, 380] }
    ],
    Shopping: [
      { desc: 'Amazon Prime Order Supplies', range: [15, 240] },
      { desc: 'Target Retail Store Outlet', range: [35, 160] },
      { desc: 'Apple Store Hardware Device', range: [99, 1299] },
      { desc: 'Nike Athletic Sneakers & Apparel', range: [75, 185] },
      { desc: 'IKEA Home Ergonomic Furniture', range: [60, 450] }
    ],
    Bills: [
      { desc: 'Apartment Monthly Rent Pay', range: [1450, 1450] },
      { desc: 'Gigabit Fiber Internet Line', range: [79.99, 79.99] },
      { desc: 'Netflix Digital Subscription', range: [19.99, 19.99] },
      { desc: 'Spotify Premium Family Plan', range: [15.99, 15.99] },
      { desc: 'State Farm Car Auto Insurance', range: [135, 135] }
    ],
    Utilities: [
      { desc: 'Municipal Electric & Power Grid', range: [85, 165] },
      { desc: 'City Water & Sewer Service', range: [35, 75] },
      { desc: 'Natural Gas Heating Supply', range: [30, 110] }
    ],
    Healthcare: [
      { desc: 'CVS Health Pharmacy Prescriptions', range: [15, 65] },
      { desc: 'Dental Care Cleaning & Exam', range: [90, 220] },
      { desc: 'Vision Center Eyewear', range: [120, 310] },
      { desc: 'Equinox Gym & Health Club', range: [185, 185] }
    ],
    Education: [
      { desc: 'Udemy Online Technical Course', range: [15, 45] },
      { desc: 'Frontend Masters Annual Plan', range: [390, 390] },
      { desc: 'O\'Reilly Technical Books & E-Books', range: [35, 70] }
    ],
    Entertainment: [
      { desc: 'AMC IMAX Movie Tickets', range: [24, 48] },
      { desc: 'Steam Digital Gaming Purchase', range: [19, 60] },
      { desc: 'Live Music Concert Event Ticket', range: [85, 240] }
    ]
  };

  // Generate 4 years of history (48 months)
  for (let m = 47; m >= 0; m--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - m, 1);

    // Monthly Paycheck
    transactions.push({
      id: generateId(),
      description: 'Acme Corp Monthly Paycheck',
      amount: 5400 + (47 - m) * 20, // Salary growth over 4 years
      type: 'income',
      category: 'Salary',
      source: 'Salary',
      date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1, 9).toISOString(),
      notes: 'Direct deposit primary income'
    });

    // Quarterly Freelance
    if (m % 3 === 0) {
      transactions.push({
        id: generateId(),
        description: 'Design Systems Client Retainer',
        amount: 1150 + (m * 10),
        type: 'income',
        category: 'Freelance',
        source: 'Freelance',
        date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 15, 14).toISOString(),
        notes: 'Client milestone consulting fee'
      });
    }

    // Monthly Expense Items
    Object.keys(merchants).forEach(cat => {
      const items = merchants[cat];
      const count = Math.floor(Math.random() * 2) + 1; // 1-2 transactions per category per month

      for (let i = 0; i < count; i++) {
        const item = items[Math.floor(Math.random() * items.length)];
        const day = Math.floor(Math.random() * 26) + 2;
        const minAmt = item.range[0];
        const maxAmt = item.range[1];
        const amount = Math.round((Math.random() * (maxAmt - minAmt) + minAmt) * 100) / 100;

        transactions.push({
          id: generateId(),
          description: item.desc,
          amount,
          type: 'expense',
          category: cat,
          date: new Date(monthDate.getFullYear(), monthDate.getMonth(), day, 12).toISOString(),
          notes: `Automated transaction item #${m}_${i}`
        });
      }
    });
  }

  return transactions;
}
