#!/usr/bin/env python3
"""
Unit tests for BudgetWise Python Utility Scripts (python_utils)
Runs standard library unittest suite verifying data validation & statistical analytics logic.
"""

import unittest
from python_utils.validate_data import validate_schema, generate_sample_data
from python_utils.generate_analytics import compute_statistics


class TestBudgetWisePythonUtils(unittest.TestCase):

    def test_schema_validation_success(self):
        sample = generate_sample_data()
        is_valid, errors = validate_schema(sample)
        self.assertTrue(is_valid, f"Expected sample data to pass validation, got errors: {errors}")
        self.assertEqual(len(errors), 0)

    def test_schema_validation_missing_keys(self):
        invalid_data = {"user": {"email": "test@test.com"}}
        is_valid, errors = validate_schema(invalid_data)
        self.assertFalse(is_valid)
        self.assertTrue(any("transactions" in e for e in errors))

    def test_schema_validation_invalid_transaction_type(self):
        data = generate_sample_data()
        data["transactions"].append({
            "id": "tx_bad",
            "type": "invalid_type",
            "amount": 100.0,
            "category": "Food",
            "date": "2026-08-01T00:00:00.000Z"
        })
        is_valid, errors = validate_schema(data)
        self.assertFalse(is_valid)
        self.assertTrue(any("invalid type" in e for e in errors))

    def test_analytics_statistics_computation(self):
        txs = [
            {"type": "income", "amount": 1000.0, "category": "Salary"},
            {"type": "expense", "amount": 200.0, "category": "Food"},
            {"type": "expense", "amount": 400.0, "category": "Bills"}
        ]
        stats = compute_statistics(txs)
        self.assertEqual(stats["total_income"], 1000.0)
        self.assertEqual(stats["total_expense"], 600.0)
        self.assertEqual(stats["net_balance"], 400.0)
        self.assertEqual(stats["mean_expense"], 300.0)
        self.assertEqual(stats["expense_count"], 2)


if __name__ == "__main__":
    unittest.main()
