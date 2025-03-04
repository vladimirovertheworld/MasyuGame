#!/bin/bash

# Ensure the script is executed with a commit message file
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <commit-message-file>"
    exit 1
fi

# Read commit message from file
COMMIT_MSG_FILE="$1"

# Check if the file exists
if [ ! -f "$COMMIT_MSG_FILE" ]; then
    echo "Error: Commit message file '$COMMIT_MSG_FILE' not found!"
    exit 1
fi

# Read commit message
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Set repository URL
REPO_URL="https://github.com/vladimirovertheworld/MasyuGame.git"

# Ensure Git is configured
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Add all changes
git add .

# Commit with the message from the file
git commit -m "$COMMIT_MSG"

# Push changes to GitHub
git push "$REPO_URL" main

echo "✅ Commit and push successful!"
