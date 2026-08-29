/* BudgetWise Enterprise GAAP & IFRS Accounting Standards Rulebook */

export const ACCOUNTING_STANDARDS_RULES = {
  GAAP: {
    name: 'Generally Accepted Accounting Principles',
    jurisdiction: 'United States',
    frameworks: [
      { id: 'ASC_606', title: 'Revenue from Contracts with Customers', summary: 'Five-step model for revenue recognition from customer contracts.' },
      { id: 'ASC_842', title: 'Leases', summary: 'Requires lessees to recognize assets and liabilities for leases with terms over 12 months.' },
      { id: 'ASC_320', title: 'Investments - Debt and Equity Securities', summary: 'Accounting for investments in debt and equity securities.' },
      { id: 'ASC_350', title: 'Intangibles - Goodwill and Other', summary: 'Goodwill impairment testing and amortization of finite-lived intangibles.' },
      { id: 'ASC_718', title: 'Compensation - Stock Compensation', summary: 'Share-based payment transactions with employees and nonemployees.' }
    ]
  },
  IFRS: {
    name: 'International Financial Reporting Standards',
    jurisdiction: 'International (140+ countries)',
    frameworks: [
      { id: 'IFRS_15', title: 'Revenue from Contracts with Customers', summary: 'Single revenue recognition model across all industries.' },
      { id: 'IFRS_16', title: 'Leases', summary: 'Single lessee accounting model removing off-balance sheet operating leases.' },
      { id: 'IFRS_9', title: 'Financial Instruments', summary: 'Classification, measurement, impairment, and hedge accounting for financial assets.' },
      { id: 'IAS_1', title: 'Presentation of Financial Statements', summary: 'Overall requirements for financial statement presentation and structure.' },
      { id: 'IAS_7', title: 'Statement of Cash Flows', summary: 'Presentation of operating, investing, and financing cash flows.' }
    ]
  }
};

export const DOUBLE_ENTRY_DEBIT_CREDIT_RULES = [
  { accountType: 'Asset', normalBalance: 'Debit', debitEffect: 'Increase', creditEffect: 'Decrease' },
  { accountType: 'Liability', normalBalance: 'Credit', debitEffect: 'Decrease', creditEffect: 'Increase' },
  { accountType: 'Equity', normalBalance: 'Credit', debitEffect: 'Decrease', creditEffect: 'Increase' },
  { accountType: 'Revenue', normalBalance: 'Credit', debitEffect: 'Decrease', creditEffect: 'Increase' },
  { accountType: 'Expense', normalBalance: 'Debit', debitEffect: 'Increase', creditEffect: 'Decrease' }
];

export function validateDoubleEntryLedger(debits = [], credits = []) {
  const sumDebits = debits.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const sumCredits = credits.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const diff = Math.abs(sumDebits - sumCredits);

  return {
    isBalanced: diff < 0.01,
    sumDebits: Math.round(sumDebits * 100) / 100,
    sumCredits: Math.round(sumCredits * 100) / 100,
    discrepancy: Math.round(diff * 100) / 100
  };
}
