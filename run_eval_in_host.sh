#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t snake-game .

# Run the container
echo "Running container..."
docker run -d -p 5173:5173 --name snake-game-container snake-game

# Wait for the container to start
echo "Waiting for container to start..."
sleep 5

# Run the E2E tests
echo "Running E2E tests..."
./run.sh

# Store the test exit code
TEST_EXIT_CODE=$?

# Clean up
echo "Cleaning up..."
docker stop snake-game-container
docker rm snake-game-container

# Exit with the test's exit code
exit $TEST_EXIT_CODE 