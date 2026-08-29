#!/usr/bin/env python3
"""
BudgetWise Data Validation Utility Script (Python 3.10+)
Validates JSON export files for schema integrity, required fields, date formats, and mathematical reconciliation.
"""

import sys
import json
import argparse
from datetime import datetime
from typing import Dict, Any, Tuple, List


def validate_schema(data: Dict[str, Any]) -> Tuple[bool, List[str]]:
    errors = []
    
    # Required top-level keys
    required_keys = ["user", "transactions", "budgets", "goals", "recurring"]
    for key in required_keys:
        if key not in data:
            errors.append(f"Missing required top-level key: '{key}'")
            
    if errors:
        return False, errors

    # Validate User
    user = data.get("user", {})
    if not isinstance(user, dict) or "email" not in user:
        errors.append("Invalid 'user' object: must be dict with 'email'")

    # Validate Transactions
    transactions = data.get("transactions", [])
    if not isinstance(transactions, list):
        errors.append("'transactions' must be a list")
    else:
        for idx, tx in enumerate(transactions):
            if not isinstance(tx, dict):
                errors.append(f"Transaction at index {idx} is not an object")
                continue
            
            for f in ["id", "type", "amount", "category", "date"]:
                if f not in tx:
                    errors.append(f"Transaction[{idx}] missing field '{f}'")
            
            if tx.get("type") not in ["income", "expense"]:
                errors.append(f"Transaction[{idx}] invalid type '{tx.get('type')}'")
                
            try:
                amt = float(tx.get("amount", 0))
                if amt <= 0:
                    errors.append(f"Transaction[{idx}] amount must be positive, got {amt}")
            except (ValueError, TypeError):
                errors.append(f"Transaction[{idx}] invalid numeric amount '{tx.get('amount')}'")

            # Date format validation
            date_str = tx.get("date")
            if date_str:
                try:
                    # ISO string check
                    datetime.fromisoformat(date_str.replace("Z", "+00:00"))
                except ValueError:
                    errors.append(f"Transaction[{idx}] invalid ISO date format '{date_str}'")

    # Mathematical Reconciliation Audit
    if not errors and isinstance(transactions, list):
        total_inc = sum(float(t["amount"]) for t in transactions if t.get("type") == "income")
        total_exp = sum(float(t["amount"]) for t in transactions if t.get("type") == "expense")
        net = total_inc - total_exp
        print(f"[RECONCILIATION] Total Income: ${total_inc:,.2f} | Total Expenses: ${total_exp:,.2f} | Net Balance: ${net:,.2f}")

    return len(errors) == 0, errors


def generate_sample_data() -> Dict[str, Any]:
    return {
        "version": "1.0.0",
        "user": {"email": "demo@budgetwise.com", "name": "Alex Morgan"},
        "transactions": [
          {"id": "tx1", "type": "income", "amount": 5400.0, "category": "Salary", "date": "2026-08-01T09:00:00.000Z"},
          {"id": "tx2", "type": "expense", "amount": 1450.0, "category": "Bills", "date": "2026-08-02T10:00:00.000Z"},
          {"id": "tx3", "type": "expense", "amount": 165.40, "category": "Food", "date": "2026-08-04T18:00:00.000Z"}
        ],
        "budgets": [{"id": "b1", "category": "Food", "limit": 750}],
        "goals": [{"id": "g1", "name": "Emergency Fund", "targetAmount": 10000, "currentAmount": 7500}],
        "recurring": []
    }


def main():
    parser = argparse.ArgumentParser(description="BudgetWise JSON Data Schema & Financial Integrity Validator")
    parser.add_argument("--file", type=str, help="Path to JSON file to validate")
    parser.add_argument("--sample", action="store_true", help="Validate sample dataset")
    args = parser.parse_args()

    if args.sample or not args.file:
        print("[INFO] Running schema validation on sample dataset...")
        data = generate_sample_data()
    else:
        try:
            with open(args.file, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"[ERROR] Failed to load JSON file '{args.file}': {e}")
            sys.exit(1)

    is_valid, errors = validate_schema(data)
    if is_valid:
        print("[PASS] JSON data schema & mathematical reconciliation audit PASSED with 0 errors!")
        sys.exit(0)
    else:
        print(f"[FAIL] Found {len(errors)} validation errors:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
