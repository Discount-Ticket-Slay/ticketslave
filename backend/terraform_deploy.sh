#!/bin/bash

# Prompt for version number
read -p "Enter the version number (e.g., 1.1): " VERSION

# Load .env file
source .env

# Export the container URL as a Terraform variable
export TF_VAR_image_version=$VERSION
export TF_VAR_ecr_repo_url=$ECR_REPO_URL

# Export the database information to AWS as a Terraform variable
export TF_VAR_my_sql_root_password=$MYSQL_ROOT_PASSWORD
export TF_VAR_my_sql_database=$MYSQL_DATABASE
export TF_VAR_spring_datasource_url=$SPRING_DATASOURCE_URL
export TF_VAR_spring_datasource_username=$SPRING_DATASOURCE_USERNAME
export TF_VAR_spring_datasource_password=$SPRING_DATASOURCE_PASSWORD

# Echo the image version for validation (tmp debugging tool)
echo "Using image version: $TF_VAR_image_version"
echo "Using ECR repo URL: $TF_VAR_ecr_repo_url"

# Initialize Terraform (downloads providers and modules, etc.)
terraform init

# Apply Terraform changes
terraform apply

# Optionally: Unset the image version environment variable for security
unset TF_VAR_image_version