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

# Set repository URL (SSH-based)
REPO_URL="git@github.com:vladimirovertheworld/MasyuGame.git"

# Ensure Git is configured with the correct user
git config --global user.name "vladimirovertheworld"
git config --global user.email "vladimir@overtheworld.uk"

# Ensure SSH key is added to the SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Test SSH connection
ssh -T git@github.com

# Add all changes
git add .

# Commit with the message from the file
git commit -m "$COMMIT_MSG"

# Push changes to GitHub via SSH
git push "$REPO_URL" main

echo "✅ Commit and push successful!"
