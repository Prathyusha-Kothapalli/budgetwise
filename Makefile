# Makefile for BudgetWise SaaS

.PHONY: help setup test test-python validate analytics serve docker-build docker-run clean

help:
	@echo "BudgetWise Management Commands:"
	@echo "  make setup        Install Node dependencies"
	@echo "  make test         Run JavaScript automated tests"
	@echo "  make test-python  Run Python unit tests"
	@echo "  make validate     Run Python data validation script"
	@echo "  make analytics    Run Python analytics CLI tool"
	@echo "  make serve        Start local dev server on port 3000"
	@echo "  make docker-build Build Docker image"
	@echo "  make docker-run   Launch container via Docker Compose"
	@echo "  make clean        Clean temporary artifacts"

setup:
	npm install

test:
	node tests/run_tests.js

test-python:
	python3 -m unittest python_utils/test_python_utils.py || python -m unittest python_utils/test_python_utils.py

validate:
	python3 python_utils/validate_data.py --sample || python python_utils/validate_data.py --sample

analytics:
	python3 python_utils/generate_analytics.py --sample || python python_utils/generate_analytics.py --sample

serve:
	npx serve -l 3000 .

docker-build:
	docker build -t budgetwise:latest .

docker-run:
	docker-compose up -d

clean:
	@echo "Cleaning up..."
	@rm -rf node_modules
