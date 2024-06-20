#!/bin/sh
# Script to run tests
echo "Running tests..."
cd ../server
npm test
cd ../client
npm test
# Tests will be written soon !!!