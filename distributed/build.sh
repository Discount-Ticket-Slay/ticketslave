#!/bin/bash

# Prompt the user for the microservice name
printf "Enter the name of the microservice to build the frontend for: "
read microservice_name

# Check if the directory exists
if [ ! -d "$microservice_name/src/main/resources/static/public/build" ]; then
    echo "Directory for microservice $microservice_name does not exist. Exiting."
    exit 1
fi

# Set the environment variable and run the build command
cd frontend
echo "MICROSERVICE_NAME is set to: $microservice_name"
env MICROSERVICE_NAME=$microservice_name npm run build

echo "Build completed for microservice $microservice_name."