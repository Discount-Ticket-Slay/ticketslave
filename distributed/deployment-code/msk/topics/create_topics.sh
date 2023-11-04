#!/bin/bash

# Change directory two levels up to the deployment directory
cd ../../

# Load the .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found"
  exit 1
fi

# Change back to the topics directory where the script and bin folder are located
cd - || exit

# Topic names
TOPIC1="buffered-queue"
TOPIC2="randomiser-group"

# Replication factor
REPLICATION_FACTOR=2

# Number of partitions
PARTITIONS=1

# Create first topic
echo "Creating topic $TOPIC1"
kafka_2.13-3.5.0/bin/kafka-topics.sh --create \
  --bootstrap-server $BOOTSTRAP_SERVERS \
  --replication-factor $REPLICATION_FACTOR \
  --partitions $PARTITIONS \
  --topic $TOPIC1

# Check the exit status of the previous command
if [ $? -ne 0 ]; then
  echo "Failed to create topic $TOPIC1"
  exit 1
fi

# Create second topic
echo "Creating topic $TOPIC2"
kafka_2.13-3.5.0/bin/kafka-topics.sh --create \
  --bootstrap-server $BOOTSTRAP_SERVERS \
  --replication-factor $REPLICATION_FACTOR \
  --partitions $PARTITIONS \
  --topic $TOPIC2

# Check the exit status of the previous command
if [ $? -ne 0 ]; then
  echo "Failed to create topic $TOPIC2"
  exit 1
fi

echo "Both topics created successfully."
