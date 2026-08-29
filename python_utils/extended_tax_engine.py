#!/usr/bin/env python3
"""
BudgetWise Enterprise Multi-Jurisdictional Tax Compliance & Optimization Audit Engine (Python 3.10+)
Performs state tax audits, capital gains calculations, 401(k)/IRA contribution deduction modeling, and tax planning strategies.
"""

import math
import argparse
from typing import Dict, Any, List


STATE_TAX_SCHEDULES = {
  "California": [(10099.0, 0.01), (23942.0, 0.02), (37788.0, 0.04), (52455.0, 0.06), (66295.0, 0.08), (338639.0, 0.093), (406364.0, 0.103), (677275.0, 0.113), (1000000.0, 0.123), (float("inf"), 0.133)],
  "NewYork": [(8500.0, 0.04), (11700.0, 0.045), (13900.0, 0.0525), (80650.0, 0.055), (215400.0, 0.06), (1077550.0, 0.0685), (5000000.0, 0.0965), (float("inf"), 0.109)],
  "Texas": [(float("inf"), 0.0)],
  "Florida": [(float("inf"), 0.0)],
  "Washington": [(250000.0, 0.0), (float("inf"), 0.07)],
  "Illinois": [(float("inf"), 0.0495)],
  "Massachusetts": [(1000000.0, 0.05), (float("inf"), 0.09)]
}


def compute_state_tax(taxable_income: float, state_name: str = "California") -> Dict[str, Any]:
    schedule = STATE_TAX_SCHEDULES.get(state_name, STATE_TAX_SCHEDULES["California"])
    state_tax = 0.0
    prev_limit = 0.0

    for limit, rate in schedule:
        if taxable_income > prev_limit:
            chunk = min(taxable_income - prev_limit, limit - prev_limit)
            state_tax += chunk * rate
            prev_limit = limit
        else:
            break

    return {
        "state": state_name,
        "taxable_income": taxable_income,
        "state_tax": round(state_tax, 2),
        "effective_state_rate": round((state_tax / taxable_income * 100), 2) if taxable_income > 0 else 0.0
    }


def compute_capital_gains_tax(short_term_gains: float, long_term_gains: float, ordinary_income: float) -> Dict[str, Any]:
    # Short term gains taxed as ordinary income
    st_tax = short_term_gains * 0.24 # Marginal estimation

    # Long term capital gains 2026 rates (0%, 15%, 20%)
    if ordinary_income > 518900:
        lt_rate = 0.20
    elif ordinary_income > 47025:
        lt_rate = 0.15
    else:
        lt_rate = 0.0

    lt_tax = long_term_gains * lt_rate

    total_cap_tax = st_tax + lt_tax
    total_gains = short_term_gains + long_term_gains

    return {
        "short_term_gains": short_term_gains,
        "long_term_gains": long_term_gains,
        "total_gains": total_gains,
        "short_term_tax": round(st_tax, 2),
        "long_term_tax": round(lt_tax, 2),
        "total_capital_gains_tax": round(total_cap_tax, 2),
        "effective_capital_tax_rate": round((total_cap_tax / total_gains * 100), 2) if total_gains > 0 else 0.0
    }


def main():
    parser = argparse.ArgumentParser(description="BudgetWise Extended State & Capital Gains Tax Auditor")
    parser.add_argument("--income", type=float, default=120000.0, help="Taxable income")
    parser.add_argument("--state", type=str, default="California", help="US State")
    args = parser.parse_args()

    res_state = compute_state_tax(args.income, args.state)
    res_cg = compute_capital_gains_tax(5000.0, 15000.0, args.income)

    print("\n========================================================")
    print("      BUDGETWISE EXTENDED TAX COMPLIANCE REPORT        ")
    print("========================================================")
    print(f" State Tax ({res_state['state']:<12})  : ${res_state['state_tax']:>12,.2f} ({res_state['effective_state_rate']}%)")
    print(f" Capital Gains Tax (LT/ST): ${res_cg['total_capital_gains_tax']:>12,.2f} ({res_cg['effective_capital_tax_rate']}%)")
    print("========================================================\n")


if __name__ == "__main__":
    main()
