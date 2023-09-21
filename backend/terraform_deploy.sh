#!/bin/bash

# Prompt for version number
read -p "Enter the version number (e.g., 1.1): " VERSION

# Load .env file
source .env

# Export the container URL as a Terraform variable
export TF_VAR_image_version=$VERSION
export TF_VAR_ecr_repo_url=$ECR_REPO_URL

# Echo the image version for validation (tmp debugging tool)
echo "Using image version: $TF_VAR_image_version"
echo "Using ECR repo URL: $TF_VAR_ecr_repo_url"

# Initialize Terraform (downloads providers and modules, etc.)
terraform init

# Apply Terraform changes
terraform apply

# Optionally: Unset the image version environment variable for security
unset TF_VAR_image_version