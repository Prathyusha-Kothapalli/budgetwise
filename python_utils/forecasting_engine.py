#!/usr/bin/env python3
"""
BudgetWise Time-Series Forecasting Engine (Python 3.10+)
Performs linear trend forecasting and moving average smoothing on financial historical data.
"""

import argparse
from typing import List, Dict, Any, Tuple


def calculate_linear_regression(series: List[float]) -> Tuple[float, float]:
    n = len(series)
    if n < 2:
        return 0.0, series[0] if n == 1 else 0.0

    x_mean = (n - 1) / 2.0
    y_mean = sum(series) / n

    numerator = sum((i - x_mean) * (y - y_mean) for i, y in enumerate(series))
    denominator = sum((i - x_mean) ** 2 for i in range(n))

    slope = numerator / denominator if denominator != 0 else 0.0
    intercept = y_mean - slope * x_mean

    return slope, intercept


def forecast_future_periods(series: List[float], future_periods: int = 6) -> Dict[str, Any]:
    slope, intercept = calculate_linear_regression(series)
    n = len(series)

    forecasts = []
    for p in range(1, future_periods + 1):
        x = n - 1 + p
        predicted_val = slope * x + intercept
        forecasts.append(max(0.0, round(predicted_val, 2)))

    return {
        "slope": round(slope, 2),
        "intercept": round(intercept, 2),
        "trend_direction": "Upward" if slope > 0 else "Downward" if slope < 0 else "Flat",
        "forecasts": forecasts
    }


def print_forecast_report(series: List[float], result: Dict[str, Any]):
    print("\n========================================================")
    print("        BUDGETWISE FINANCIAL FORECASTING REPORT         ")
    print("========================================================")
    print(f" Trend Direction         : {result['trend_direction']:>12}")
    print(f" Monthly Slope (Delta)   : ${result['slope']:>12,.2f}/mo")
    print("--------------------------------------------------------")
    print(" PROJECTED FUTURE PERIODS:")
    for idx, val in enumerate(result['forecasts'], start=1):
        print(f"   Period +{idx:<2}               : ${val:>12,.2f}")
    print("========================================================\n")


def main():
    parser = argparse.ArgumentParser(description="BudgetWise Financial Time-Series Forecaster")
    parser.add_argument("--periods", type=int, default=6, help="Number of future months to forecast")
    args = parser.parse_args()

    sample_history = [1450.0, 1480.0, 1520.0, 1590.0, 1610.0, 1650.0, 1710.0, 1780.0]
    result = forecast_future_periods(sample_history, args.periods)
    print_forecast_report(sample_history, result)


if __name__ == "__main__":
    main()
