/* BudgetWise Advanced Quantitative Finance & Analytics Engine */

/**
 * Cumulative Standard Normal Distribution N(x) approximation
 */
export function standardNormalCDF(x) {
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (x >= 0) {
    const t = 1.0 / (1.0 + p * x);
    return 1.0 - c * Math.exp(-x * x / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  } else {
    const t = 1.0 / (1.0 - p * x);
    return c * Math.exp(-x * x / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
}

/**
 * Black-Scholes European Option Pricing Formula
 */
export function calculateBlackScholesOption(spotPrice, strikePrice, timeToMaturityYears, riskFreeRate, volatility) {
  const S = spotPrice;
  const K = strikePrice;
  const T = timeToMaturityYears;
  const r = riskFreeRate;
  const v = volatility;

  const d1 = (Math.log(S / K) + (r + (v * v) / 2.0) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);

  const callPrice = S * standardNormalCDF(d1) - K * Math.exp(-r * T) * standardNormalCDF(d2);
  const putPrice = K * Math.exp(-r * T) * standardNormalCDF(-d2) - S * standardNormalCDF(-d1);

  return {
    spotPrice: S,
    strikePrice: K,
    timeToMaturityYears: T,
    callPrice: Math.round(callPrice * 100) / 100,
    putPrice: Math.round(putPrice * 100) / 100,
    d1: Math.round(d1 * 10000) / 10000,
    d2: Math.round(d2 * 10000) / 10000
  };
}

/**
 * Capital Asset Pricing Model (CAPM) Expected Return
 */
export function calculateCAPM(riskFreeRate, beta, marketExpectedReturn) {
  const marketRiskPremium = marketExpectedReturn - riskFreeRate;
  const expectedReturn = riskFreeRate + beta * marketRiskPremium;

  return {
    riskFreeRate,
    beta,
    marketExpectedReturn,
    marketRiskPremium: Math.round(marketRiskPremium * 1000) / 10,
    expectedReturn: Math.round(expectedReturn * 1000) / 10
  };
}

/**
 * Calculates Comprehensive Personal Financial Ratios
 */
export function calculatePersonalFinancialRatios({ grossMonthlyIncome = 1, netMonthlyIncome = 1, totalMonthlyExpenses = 1, totalMonthlyDebtPayments = 0, totalLiquidAssets = 0, totalAssets = 1, totalLiabilities = 0 }) {
  const liquidityRatio = totalLiquidAssets / (totalMonthlyExpenses || 1); // Months of living expenses covered
  const debtToIncomeRatio = (totalMonthlyDebtPayments / (grossMonthlyIncome || 1)) * 100;
  const savingsRatio = Math.max(0, ((netMonthlyIncome - totalMonthlyExpenses) / (netMonthlyIncome || 1)) * 100);
  const solvencyRatio = ((totalAssets - totalLiabilities) / (totalAssets || 1)) * 100;

  let healthCategory = 'Excellent';
  if (liquidityRatio < 3 || debtToIncomeRatio > 43 || savingsRatio < 10) {
    healthCategory = 'Needs Improvement';
  } else if (liquidityRatio < 6 || debtToIncomeRatio > 36 || savingsRatio < 20) {
    healthCategory = 'Good';
  }

  return {
    liquidityRatioMonths: Math.round(liquidityRatio * 10) / 10,
    debtToIncomePercentage: Math.round(debtToIncomeRatio * 10) / 10,
    savingsRatePercentage: Math.round(savingsRatio * 10) / 10,
    solvencyRatioPercentage: Math.round(solvencyRatio * 10) / 10,
    healthCategory
  };
}
