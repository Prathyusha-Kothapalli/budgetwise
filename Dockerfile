# Dockerfile for BudgetWise SaaS
FROM nginx:alpine

# Copy web application files into Nginx public directory
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
