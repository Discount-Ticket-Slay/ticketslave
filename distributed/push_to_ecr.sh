#!/bin/bash

# load .env file
source .env

# Define AWS account ID and region
AWS_ACCOUNT_ID="$AWS_ACCOUNT_ID"
AWS_REGION="ap-southeast-1"

# ECR repository names
FEED_REPO="feed-service"
QUEUE_REPO="queue-service"
BUFFER_REPO="buffer-service"
PURCHASE_REPO="purchase-service"
PAYMENT_REPO="payment-service"

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create ECR repositories if they don't exist
aws ecr describe-repositories --repository-names $FEED_REPO || aws ecr create-repository --repository-name $FEED_REPO
aws ecr describe-repositories --repository-names $QUEUE_REPO || aws ecr create-repository --repository-name $QUEUE_REPO
aws ecr describe-repositories --repository-names $BUFFER_REPO || aws ecr create-repository --repository-name $BUFFER_REPO
aws ecr describe-repositories --repository-names $PURCHASE_REPO || aws ecr create-repository --repository-name $PURCHASE_REPO
aws ecr describe-repositories --repository-names $PAYMENT_REPO || aws ecr create-repository --repository-name $PAYMENT_REPO

# Build Docker images in parallel
docker build -t $FEED_REPO ./feed-service/feed-backend &
docker build -t $QUEUE_REPO ./queue-service/queue-backend &
docker build -t $BUFFER_REPO ./buffer-service/buffer-backend &
docker build -t $PURCHASE_REPO ./purchase-service/purchase-backend &
docker build -t $PAYMENT_REPO ./payment-service/payment-backend

# Wait for all build processes to complete
wait

# Tag Docker images
docker tag $FEED_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FEED_REPO:latest
docker tag $QUEUE_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$QUEUE_REPO:latest
docker tag $BUFFER_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BUFFER_REPO:latest
docker tag $PURCHASE_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PURCHASE_REPO:latest
docker tag $PAYMENT_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PAYMENT_REPO:latest

# Push Docker images to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FEED_REPO:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$QUEUE_REPO:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BUFFER_REPO:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PURCHASE_REPO:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PAYMENT_REPO:latest