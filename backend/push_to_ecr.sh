#!/bin/bash

# Prompt for version number
read -p "Enter the version number (e.g., 1.1): " VERSION

# Build the Docker image
docker build -t "buyticketapp:$VERSION" .

# Load .env file
source .env

# Authenticate Docker with ECR
ECR_PASSWORD=$(aws ecr get-login-password --region ap-southeast-1)
echo "$ECR_PASSWORD" | docker login --username AWS --password-stdin $ECR_REPO_URL

# Tag the image
LOCAL_IMAGE_NAME="buyticketapp"
docker tag "$LOCAL_IMAGE_NAME:$VERSION" "$ECR_REPO_URL:$VERSION"

# Push the image to ECR
docker push "$ECR_REPO_URL:$VERSION"

# Clean up (clear the password for security)
unset ECR_PASSWORD