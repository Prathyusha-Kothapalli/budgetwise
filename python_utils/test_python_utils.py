#!/usr/bin/env python3
"""
Unit tests for BudgetWise Python Utility Suite (python_utils)
Executes tests across validation, analytics, tax calculations, risk modeling, and forecasting.
"""

import unittest
from python_utils.validate_data import validate_schema, generate_sample_data
from python_utils.generate_analytics import compute_statistics
from python_utils.tax_calculator import calculate_us_federal_tax
from python_utils.portfolio_risk import calculate_portfolio_metrics
from python_utils.forecasting_engine import calculate_linear_regression, forecast_future_periods


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

    def test_tax_calculator(self):
        res = calculate_us_federal_tax(100000.0, "single")
        self.assertTrue(res["total_tax"] > 0)
        self.assertTrue(res["net_annual_pay"] < 100000.0)
        self.assertEqual(res["taxable_income"], 85400.0)

    def test_portfolio_risk_metrics(self):
        returns = [0.02, 0.01, -0.005, 0.015, 0.03, -0.01]
        metrics = calculate_portfolio_metrics(returns, 0.04)
        self.assertIn("annualized_return", metrics)
        self.assertIn("sharpe_ratio", metrics)

    def test_forecasting_engine(self):
        series = [100.0, 110.0, 120.0, 130.0, 140.0]
        slope, intercept = calculate_linear_regression(series)
        self.assertEqual(slope, 10.0)
        forecast = forecast_future_periods(series, 2)
        self.assertEqual(forecast["forecasts"], [150.0, 160.0])


if __name__ == "__main__":
    unittest.main()
