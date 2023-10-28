#!/bin/bash

# Step 1: Stop and remove all Docker Compose services
docker-compose down

# Step 2: Remove the distributed-queue image
docker rmi distributed-queue

# Step 3: Remove the distributed-feed image
docker rmi distributed-feed

# Step 4: Remove the distributed-buffer image
docker rmi distributed-buffer

# Step 5: Build and start the Docker Compose services in detached mode
docker-compose up -d --build
