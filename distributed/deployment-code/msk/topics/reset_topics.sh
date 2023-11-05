#!/bin/bash

# Save the current directory
current_dir=$(pwd)

# Change directory two levels up to the deployment directory
cd ../../

# Load the .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found"
  exit 1
fi

# Change back to the original directory where the script is located
cd "$current_dir" || exit

# Kafka bin directory (assuming it's the same directory as the script)
KAFKA_BIN_DIR="./"

# Topic names
TOPIC1="buffered-queue"
TOPIC2="randomiser-group"

# Function to delete a topic
delete_topic() {
  local topic_name=$1
  echo "Deleting topic $topic_name"
  ${KAFKA_BIN_DIR}kafka-topics.sh --delete \
    --bootstrap-server $BOOTSTRAP_SERVERS \
    --topic $topic_name

  # Check the exit status of the delete command
  if [ $? -ne 0 ]; then
    echo "Failed to delete topic $topic_name"
    exit 1
  fi
}

# Function to create a topic
create_topic() {
  local topic_name=$1
  echo "Creating topic $topic_name"
  ${KAFKA_BIN_DIR}kafka-topics.sh --create \
    --bootstrap-server $BOOTSTRAP_SERVERS \
    --replication-factor $REPLICATION_FACTOR \
    --partitions $PARTITIONS \
    --topic $topic_name

  # Check the exit status of the create command
  if [ $? -ne 0 ]; then
    echo "Failed to create topic $topic_name"
    exit 1
  fi
}

# Delete and recreate topics
delete_topic $TOPIC1
create_topic $TOPIC1

delete_topic $TOPIC2
create_topic $TOPIC2

echo "Both topics reset successfully."
