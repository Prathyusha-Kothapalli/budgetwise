#!/usr/bin/env python3
"""
BudgetWise Portfolio Risk & Sharpe Ratio Analytical Tool (Python 3.10+)
Calculates portfolio mean return, annual volatility, Sharpe Ratio, and Maximum Drawdown.
"""

import math
import argparse
from typing import List, Dict, Any


def calculate_portfolio_metrics(returns: List[float], risk_free_rate: float = 0.04) -> Dict[str, Any]:
    if not returns:
        return {"error": "Empty returns list"}

    n = len(returns)
    mean_return = sum(returns) / n
    annualized_return = mean_return * 12

    # Volatility (Standard deviation of monthly returns * sqrt(12))
    variance = sum((r - mean_return) ** 2 for r in returns) / (n - 1 if n > 1 else 1)
    monthly_vol = math.sqrt(variance)
    annualized_vol = monthly_vol * math.sqrt(12)

    # Sharpe Ratio
    sharpe_ratio = (annualized_return - risk_free_rate) / annualized_vol if annualized_vol > 0 else 0.0

    # Max Drawdown
    cumulative = 1.0
    peak = 1.0
    max_drawdown = 0.0

    for r in returns:
        cumulative *= (1.0 + r)
        if cumulative > peak:
            peak = cumulative
        drawdown = (peak - cumulative) / peak
        if drawdown > max_drawdown:
            max_drawdown = drawdown

    return {
        "monthly_mean_return": mean_return,
        "annualized_return": annualized_return,
        "annualized_volatility": annualized_vol,
        "sharpe_ratio": sharpe_ratio,
        "max_drawdown_pct": max_drawdown * 100
    }


def print_risk_report(metrics: Dict[str, Any]):
    print("\n========================================================")
    print("        BUDGETWISE PORTFOLIO RISK ANALYSIS REPORT       ")
    print("========================================================")
    print(f" Annualized Return       : {metrics['annualized_return']*100:>11.2f}%")
    print(f" Annualized Volatility   : {metrics['annualized_volatility']*100:>11.2f}%")
    print(f" Risk-Adjusted Sharpe    : {metrics['sharpe_ratio']:>12.2f}")
    print(f" Maximum Drawdown (Peak) : {metrics['max_drawdown_pct']:>11.2f}%")
    print("========================================================\n")


def main():
    parser = argparse.ArgumentParser(description="BudgetWise Portfolio Risk CLI Analyzer")
    parser.add_argument("--rate", type=float, default=0.04, help="Risk-free interest rate")
    args = parser.parse_args()

    sample_returns = [0.015, -0.008, 0.022, 0.031, -0.012, 0.018, 0.025, -0.005, 0.019, 0.014, -0.011, 0.028]
    metrics = calculate_portfolio_metrics(sample_returns, args.rate)
    print_risk_report(metrics)


if __name__ == "__main__":
    main()
