#!/bin/bash

# Step 1: Stop and remove all Docker Compose services
docker-compose down || true

# Step 2: Remove the distributed-queue image
docker rmi distributed-queue:latest || true

# Step 3: Remove the distributed-feed image
docker rmi distributed-feed:latest || true

# Step 4: Remove the distributed-buffer image
docker rmi distributed-buffer:latest || true

# Step 5: Remove the distributed-purchase image
docker rmi distributed-purchase:latest || true

# Step 6: Remove the distributed-payment image
docker rmi distributed-payment:latest || true

# Step 7: Pull the latest images (if desired, otherwise this step can be removed)
docker-compose pull || true

# Step 8: Build and start the Docker Compose services in detached mode
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build --force-recreate
