#!/bin/bash

# Start the development server in the background
npm run dev &

# Store the process ID
SERVER_PID=$!

# Wait for the server to start
echo "Waiting for server to start..."
sleep 5

# Run Cypress tests
echo "Running E2E tests..."
npm run cypress:run

# Store the exit code of the tests
TEST_EXIT_CODE=$?

# Kill the server process
kill $SERVER_PID

# Exit with the test's exit code
exit $TEST_EXIT_CODE 