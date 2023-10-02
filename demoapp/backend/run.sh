#!/bin/bash

# Ask the user for a version of the image
read -p "Please enter the version of the image: " version

# Attempt to run docker-compose down (errors are ignored)
docker-compose down || echo "Failed to bring down containers, but continuing..."

# Remove the previous image
docker rmi "backend:$version" || echo "Failed to remove image backend:$version, but continuing..."

# Run docker-compose up
docker-compose up