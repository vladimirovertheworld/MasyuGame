#!/bin/bash

# Define variables
GITHUB_USER="vladimirovertheworld"
GITHUB_REPO="MasyuGame"
GITHUB_URL="https://github.com/$GITHUB_USER/$GITHUB_REPO.git"
LOCAL_REPO_PATH="$HOME/$GITHUB_REPO"
GITHUB_EMAIL="vladimir@overtheworld.uk"

# Check if Git is installed
if ! command -v git &>/dev/null; then
    echo "Error: Git is not installed. Please install Git before proceeding."
    exit 1
fi

# Display Git version
echo "Git version: $(git --version)"

# Check and set global Git username and email
GIT_USER=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)
if [[ -z "$GIT_USER" || "$GIT_USER" != "$GITHUB_USER" ]]; then
    git config --global user.name "$GITHUB_USER"
    echo "Git global username set to $GITHUB_USER"
fi
if [[ -z "$GIT_EMAIL" || "$GIT_EMAIL" != "$GITHUB_EMAIL" ]]; then
    git config --global user.email "$GITHUB_EMAIL"
    echo "Git global email set to $GITHUB_EMAIL"
fi

# Check if the local repository exists
if [ -d "$LOCAL_REPO_PATH/.git" ]; then
    echo "Repository already exists locally. Checking remote URL..."
    cd "$LOCAL_REPO_PATH" || exit
    CURRENT_REMOTE=$(git remote get-url origin)
    if [[ "$CURRENT_REMOTE" != "$GITHUB_URL" ]]; then
        echo "Updating remote origin URL..."
        git remote set-url origin "$GITHUB_URL"
    else
        echo "Remote origin URL is correctly set."
    fi
else
    echo "Cloning repository..."
    git clone "$GITHUB_URL" "$LOCAL_REPO_PATH"
fi

# Navigate to the repository directory
cd "$LOCAL_REPO_PATH" || exit

echo "Pulling latest changes from the repository..."
git pull origin main

echo "Git environment setup complete. Repository is up to date."
