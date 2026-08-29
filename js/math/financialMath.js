/* BudgetWise Enterprise Financial Mathematics & Quantitative Modeling Engine */

/**
 * Calculates compound interest growth with periodic deposits
 */
export function calculateCompoundInterest({ principal = 0, monthlyContribution = 0, annualRate = 0.07, years = 10, compoundingPerYear = 12 }) {
  const r = annualRate / compoundingPerYear;
  const n = compoundingPerYear * years;
  let currentBalance = principal;
  let totalDeposited = principal;
  let totalInterestEarned = 0;
  
  const schedule = [];

  for (let month = 1; month <= n; month++) {
    const interestForMonth = currentBalance * r;
    currentBalance += interestForMonth + monthlyContribution;
    totalDeposited += monthlyContribution;
    totalInterestEarned += interestForMonth;

    if (month % compoundingPerYear === 0) {
      schedule.push({
        year: month / compoundingPerYear,
        balance: Math.round(currentBalance * 100) / 100,
        totalDeposited: Math.round(totalDeposited * 100) / 100,
        totalInterest: Math.round(totalInterestEarned * 100) / 100
      });
    }
  }

  return {
    finalBalance: Math.round(currentBalance * 100) / 100,
    totalDeposited: Math.round(totalDeposited * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    schedule
  };
}

/**
 * Calculates Net Present Value (NPV) for cash flows
 */
export function calculateNPV(discountRate, initialInvestment, cashFlows = []) {
  let npv = -initialInvestment;
  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + discountRate, t + 1);
  }
  return Math.round(npv * 100) / 100;
}

/**
 * Calculates Internal Rate of Return (IRR) using Newton-Raphson method
 */
export function calculateIRR(initialInvestment, cashFlows = [], maxIterations = 1000, precision = 1e-7) {
  let rate = 0.10; // Initial guess 10%

  for (let i = 0; i < maxIterations; i++) {
    let npv = -initialInvestment;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const period = t + 1;
      const discount = Math.pow(1 + rate, period);
      npv += cashFlows[t] / discount;
      dnpv -= period * cashFlows[t] / Math.pow(1 + rate, period + 1);
    }

    const nextRate = rate - npv / dnpv;
    if (Math.abs(nextRate - rate) < precision) {
      return Math.round(nextRate * 10000) / 100; // Returns percentage
    }
    rate = nextRate;
  }

  return Math.round(rate * 10000) / 100;
}

/**
 * Generates full loan amortization schedule
 */
export function generateAmortizationSchedule(loanAmount, annualInterestRate, termInYears) {
  const monthlyRate = (annualInterestRate / 100) / 12;
  const numberOfPayments = termInYears * 12;
  
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  let balance = loanAmount;
  let totalInterestPaid = 0;
  const schedule = [];

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    totalInterestPaid += interestPayment;

    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      remainingBalance: Math.round(balance * 100) / 100
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round((monthlyPayment * numberOfPayments) * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    schedule
  };
}

/**
 * Calculates debt payoff strategy (Snowball vs Avalanche)
 */
export function calculateDebtPayoffSchedule(debts = [], monthlyExtraBudget = 200, strategy = 'avalanche') {
  const activeDebts = debts.map(d => ({ ...d, currentBalance: Number(d.balance) }));

  if (strategy === 'avalanche') {
    // Highest interest rate first
    activeDebts.sort((a, b) => Number(b.rate) - Number(a.rate));
  } else {
    // Lowest balance first (Snowball)
    activeDebts.sort((a, b) => Number(a.currentBalance) - Number(b.currentBalance));
  }

  let totalMonths = 0;
  let totalInterestPaid = 0;
  const timeline = [];

  while (activeDebts.some(d => d.currentBalance > 0) && totalMonths < 360) {
    totalMonths++;
    let extraAvailable = monthlyExtraBudget;

    activeDebts.forEach(d => {
      if (d.currentBalance <= 0) return;

      const monthlyRate = (Number(d.rate) / 100) / 12;
      const interest = d.currentBalance * monthlyRate;
      totalInterestPaid += interest;
      let payment = Number(d.minPayment) + interest;

      d.currentBalance += interest;
      d.currentBalance -= payment;

      if (d.currentBalance < 0) {
        extraAvailable += Math.abs(d.currentBalance);
        d.currentBalance = 0;
      }
    });

    // Apply extra payment to focus debt
    const targetDebt = activeDebts.find(d => d.currentBalance > 0);
    if (targetDebt && extraAvailable > 0) {
      targetDebt.currentBalance -= extraAvailable;
      if (targetDebt.currentBalance < 0) targetDebt.currentBalance = 0;
    }

    timeline.push({
      month: totalMonths,
      remainingDebts: activeDebts.map(d => ({ name: d.name, balance: Math.round(d.currentBalance) }))
    });
  }

  return {
    strategy,
    monthsToPayoff: totalMonths,
    yearsToPayoff: (totalMonths / 12).toFixed(1),
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    timeline
  };
}

/**
 * Estimates Federal income tax liability (US 2026 Tax Bracket model)
 */
export function estimateTaxLiability(taxableIncome, filingStatus = 'single') {
  const brackets = filingStatus === 'joint' ? [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ] : [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ];

  let tax = 0;
  let previousLimit = 0;

  for (const b of brackets) {
    if (taxableIncome > previousLimit) {
      const taxableInBracket = Math.min(taxableIncome - previousLimit, b.limit - previousLimit);
      tax += taxableInBracket * b.rate;
      previousLimit = b.limit;
    } else {
      break;
    }
  }

  const effectiveRate = taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0;

  return {
    taxableIncome,
    estimatedTax: Math.round(tax * 100) / 100,
    effectiveTaxRate: Math.round(effectiveRate * 10) / 10,
    netTakeHome: Math.round((taxableIncome - tax) * 100) / 100
  };
}

/**
 * Inflation Adjustment Calculator
 */
export function calculateInflationAdjustedValue(currentAmount, years, inflationRate = 0.03) {
  const futureValueFactor = Math.pow(1 + inflationRate, years);
  const futureNominalValue = currentAmount * futureValueFactor;
  const purchasingPowerInFuture = currentAmount / futureValueFactor;

  return {
    currentAmount,
    years,
    inflationRate,
    purchasingPowerInFuture: Math.round(purchasingPowerInFuture * 100) / 100,
    futureNominalValue: Math.round(futureNominalValue * 100) / 100
  };
}

/**
 * Monte Carlo Simulation for Portfolio Growth Uncertainty
 */
export function runMonteCarloSimulation({ initialAmount = 10000, monthlyDeposit = 500, years = 10, expectedReturn = 0.08, volatility = 0.15, runs = 100 }) {
  const months = years * 12;
  const monthlyReturn = expectedReturn / 12;
  const monthlyVol = volatility / Math.sqrt(12);

  const results = [];

  for (let sim = 0; sim < runs; sim++) {
    let balance = initialAmount;
    for (let m = 0; m < months; m++) {
      // Box-Muller transform for normal distribution
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

      const monthRate = monthlyReturn + monthlyVol * z;
      balance = balance * (1 + monthRate) + monthlyDeposit;
    }
    results.push(Math.max(0, balance));
  }

  results.sort((a, b) => a - b);

  const p10 = results[Math.floor(runs * 0.10)]; // 10th percentile (Pessimistic)
  const p50 = results[Math.floor(runs * 0.50)]; // 50th percentile (Median)
  const p90 = results[Math.floor(runs * 0.90)]; // 90th percentile (Optimistic)

  return {
    runs,
    pessimisticP10: Math.round(p10 * 100) / 100,
    medianP50: Math.round(p50 * 100) / 100,
    optimisticP90: Math.round(p90 * 100) / 100
  };
}
