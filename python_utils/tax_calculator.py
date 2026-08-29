#!/usr/bin/env python3
"""
BudgetWise Federal & State Income Tax Estimation CLI Tool (Python 3.10+)
Calculates tax brackets, marginal rate, effective tax rate, and FICA withholdings.
"""

import sys
import argparse
from typing import Dict, Any


def calculate_us_federal_tax(gross_income: float, filing_status: str = "single") -> Dict[str, Any]:
    # 2026 Federal Standard Deductions
    standard_deduction = 14600.0 if filing_status == "single" else 29200.0
    taxable_income = max(0.0, gross_income - standard_deduction)

    # Brackets
    if filing_status == "joint":
        brackets = [
            (23200.0, 0.10),
            (94300.0, 0.12),
            (201050.0, 0.22),
            (383900.0, 0.24),
            (487450.0, 0.32),
            (731200.0, 0.35),
            (float("inf"), 0.37)
        ]
    else:
        brackets = [
            (11600.0, 0.10),
            (47150.0, 0.12),
            (100525.0, 0.22),
            (191950.0, 0.24),
            (243725.0, 0.32),
            (609350.0, 0.35),
            (float("inf"), 0.37)
        ]

    fed_tax = 0.0
    prev_limit = 0.0

    for limit, rate in brackets:
        if taxable_income > prev_limit:
            taxable_chunk = min(taxable_income - prev_limit, limit - prev_limit)
            fed_tax += taxable_chunk * rate
            prev_limit = limit
        else:
            break

    # FICA (Social Security 6.2% + Medicare 1.45%)
    fica_tax = gross_income * 0.0765

    total_tax = fed_tax + fica_tax
    net_pay = gross_income - total_tax

    return {
        "gross_income": gross_income,
        "filing_status": filing_status,
        "standard_deduction": standard_deduction,
        "taxable_income": taxable_income,
        "federal_tax": fed_tax,
        "fica_tax": fica_tax,
        "total_tax": total_tax,
        "effective_tax_rate": (total_tax / gross_income * 100) if gross_income > 0 else 0.0,
        "net_annual_pay": net_pay,
        "net_monthly_pay": net_pay / 12.0
    }


def print_tax_report(result: Dict[str, Any]):
    print("\n========================================================")
    print("        BUDGETWISE INCOME TAX ESTIMATOR REPORT          ")
    print("========================================================")
    print(f" Gross Annual Income     : ${result['gross_income']:>12,.2f}")
    print(f" Filing Status           : {result['filing_status'].capitalize():>12}")
    print(f" Standard Deduction      : ${result['standard_deduction']:>12,.2f}")
    print(f" Taxable Net Income      : ${result['taxable_income']:>12,.2f}")
    print("--------------------------------------------------------")
    print(f" Federal Income Tax      : ${result['federal_tax']:>12,.2f}")
    print(f" FICA (SS + Medicare)    : ${result['fica_tax']:>12,.2f}")
    print(f" Combined Tax Obligation : ${result['total_tax']:>12,.2f}")
    print(f" Effective Tax Rate      : {result['effective_tax_rate']:>11.1f}%")
    print("--------------------------------------------------------")
    print(f" Net Take-Home (Annual)  : ${result['net_annual_pay']:>12,.2f}")
    print(f" Net Take-Home (Monthly) : ${result['net_monthly_pay']:>12,.2f}")
    print("========================================================\n")


def main():
    parser = argparse.ArgumentParser(description="BudgetWise Tax Estimation CLI Tool")
    parser.add_argument("--income", type=float, default=85000.0, help="Gross annual income")
    parser.add_argument("--status", type=str, default="single", choices=["single", "joint"], help="Filing status")
    args = parser.parse_args()

    result = calculate_us_federal_tax(args.income, args.status)
    print_tax_report(result)


if __name__ == "__main__":
    main()
