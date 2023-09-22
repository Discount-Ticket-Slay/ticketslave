#!/bin/bash

# Prompt for service to push
read -p "Enter the service to push (e.g., buyticketapp): " SERVICE

# Check if service directory exists
if [ ! -d "$SERVICE" ]; then
    echo "Error: The directory '$SERVICE' does not exist."
    exit 1
fi

# Change directory to service
cd $SERVICE

# Prompt for version number
read -p "Enter the version number (e.g., 1.1): " VERSION

# Build the Docker image
docker build -t "$SERVICE:$VERSION" .

# Load .env file
source .env

# Authenticate Docker with ECR
ECR_PASSWORD=$(aws ecr get-login-password --region ap-southeast-1)
echo "$ECR_PASSWORD" | docker login --username AWS --password-stdin $ECR_REPO_URL

# Tag the image
LOCAL_IMAGE_NAME="$SERVICE"
docker tag "$LOCAL_IMAGE_NAME:$VERSION" "$ECR_REPO_URL$SERVICE:$VERSION"

# Push the image to ECR
docker push "$ECR_REPO_URL$SERVICE:$VERSION"

# Clean up (clear the password for security)
unset ECR_PASSWORD