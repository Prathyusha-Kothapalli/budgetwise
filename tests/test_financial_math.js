/* Unit Tests for Financial Mathematics Engine */
import { calculateCompoundInterest, calculateNPV, calculateIRR, generateAmortizationSchedule, estimateTaxLiability } from '../js/math/financialMath.js';

export function runFinancialMathTests(assert) {
  // Compound Interest
  const compound = calculateCompoundInterest({ principal: 10000, monthlyContribution: 500, annualRate: 0.08, years: 10 });
  assert(compound.finalBalance > 10000 + (500 * 120), 'Compound interest final balance exceeds sum of contributions');
  assert(compound.totalInterestEarned > 0, 'Total interest earned is strictly positive');

  // NPV
  const npv = calculateNPV(0.10, 1000, [300, 400, 500, 600]);
  assert(typeof npv === 'number', 'NPV calculation returns numeric result');

  // Amortization Schedule
  const loan = generateAmortizationSchedule(250000, 6.5, 30);
  assert(loan.monthlyPayment > 0, 'Loan amortization calculates positive monthly payment');
  assert(loan.schedule.length === 360, 'Loan schedule contains 360 monthly periods for 30yr term');

  // Tax Liability
  const tax = estimateTaxLiability(85000, 'single');
  assert(tax.estimatedTax > 0, 'Tax liability estimation returns positive tax amount');
  assert(tax.effectiveTaxRate < 30, 'Effective tax rate is reasonable');
}
