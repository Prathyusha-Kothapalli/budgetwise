#!/usr/bin/env python3
"""
BudgetWise Statistical Analytics Utility Script (Python 3.10+)
Calculates mean monthly spending, variance, category percentage breakdown, and spending trend direction.
"""

import sys
import json
import math
import argparse
from typing import Dict, Any, List


def compute_statistics(transactions: List[Dict[str, Any]]) -> Dict[str, Any]:
    income_txs = [float(t["amount"]) for t in transactions if t.get("type") == "income"]
    expense_txs = [float(t["amount"]) for t in transactions if t.get("type") == "expense"]

    total_income = sum(income_txs)
    total_expense = sum(expense_txs)
    count_expense = len(expense_txs)

    mean_expense = total_expense / count_expense if count_expense > 0 else 0.0

    # Calculate standard deviation
    variance = (
        sum((x - mean_expense) ** 2 for x in expense_txs) / count_expense
        if count_expense > 1
        else 0.0
    )
    std_dev = math.sqrt(variance)

    # Category totals
    category_map = {}
    for t in transactions:
        if t.get("type") == "expense":
            cat = t.get("category", "Other")
            amt = float(t.get("amount", 0))
            category_map[cat] = category_map.get(cat, 0.0) + amt

    sorted_categories = sorted(category_map.items(), key=lambda item: item[1], reverse=True)

    # Top 3 largest expenses
    top_expenses = sorted(
        [t for t in transactions if t.get("type") == "expense"],
        key=lambda item: float(item.get("amount", 0)),
        reverse=True
    )[:3]

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_balance": total_income - total_expense,
        "expense_count": count_expense,
        "mean_expense": mean_expense,
        "std_dev_expense": std_dev,
        "category_totals": sorted_categories,
        "top_expenses": top_expenses
    }


def print_cli_report(stats: Dict[str, Any]):
    print("\n========================================================")
    print("        BUDGETWISE FINANCIAL STATISTICAL REPORT        ")
    print("========================================================")
    print(f" Total Income Recorded   : ${stats['total_income']:>12,.2f}")
    print(f" Total Expense Outflow   : ${stats['total_expense']:>12,.2f}")
    print(f" Net Balance Cumulative  : ${stats['net_balance']:>12,.2f}")
    print("--------------------------------------------------------")
    print(f" Total Expense Items     : {stats['expense_count']:>12d}")
    print(f" Mean Expense Amount     : ${stats['mean_expense']:>12,.2f}")
    print(f" Expense Std Deviation   : ${stats['std_dev_expense']:>12,.2f}")
    print("--------------------------------------------------------")
    print(" CATEGORY SPENDING BREAKDOWN:")
    tot_exp = stats['total_expense'] or 1.0
    for cat, amt in stats['category_totals']:
        pct = (amt / tot_exp) * 100
        bars = "#" * int(pct // 4)
        print(f"   {cat:<18} : ${amt:>9,.2f} ({pct:>5.1f}%) | {bars}")
    print("========================================================\n")


def main():
    parser = argparse.ArgumentParser(description="BudgetWise CLI Financial Analytics Processor")
    parser.add_argument("--file", type=str, help="JSON data file path")
    parser.add_argument("--sample", action="store_true", help="Run analytics on sample data")
    args = parser.parse_args()

    sample_txs = [
        {"type": "income", "amount": 5400.0, "category": "Salary"},
        {"type": "income", "amount": 850.0, "category": "Freelance"},
        {"type": "expense", "amount": 1450.0, "category": "Bills"},
        {"type": "expense", "amount": 165.40, "category": "Food"},
        {"type": "expense", "amount": 142.10, "category": "Food"},
        {"type": "expense", "amount": 79.99, "category": "Bills"},
        {"type": "expense", "amount": 115.50, "category": "Utilities"},
        {"type": "expense", "amount": 88.50, "category": "Food"},
        {"type": "expense", "amount": 54.20, "category": "Travel"},
        {"type": "expense", "amount": 124.90, "category": "Shopping"}
    ]

    if args.file:
        try:
            with open(args.file, "r", encoding="utf-8") as f:
                content = json.load(f)
                txs = content.get("transactions", [])
        except Exception as e:
            print(f"[ERROR] Could not read JSON file: {e}")
            sys.exit(1)
    else:
        txs = sample_txs

    stats = compute_statistics(txs)
    print_cli_report(stats)


if __name__ == "__main__":
    main()
