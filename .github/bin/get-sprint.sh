#!/bin/bash

set -e

function print_red() {
	echo -e "\e[31m$@\e[0m"
}

function print_orange() {
	echo -e "\e[33m$@\e[0m"
}

SPRINT_NUMBER=12

if [ ! -f sprint.txt ]; then
  print_red "There should be a file 'sprint.txt' in the root folder!"
  print_orange "Using default sprint number 12."
else
  TEXT_OUTPUT=$(cat sprint.txt | tr -d '[:space:]')

  # check if text output matches valid sprint format: 12, 13, 12-ft, or 13-ft
  if [[ ! $TEXT_OUTPUT =~ ^(12|13)(-ft)?$ ]]; then
    print_red "$TEXT_OUTPUT in file 'sprint.txt' is not a valid sprint number!"
    print_orange "Valid options are: 12, 13, 12-ft, or 13-ft"
    exit 1
  else
    SPRINT_NUMBER=$TEXT_OUTPUT
  fi
fi

# Extract base sprint number (12 or 13) for file checking
BASE_SPRINT=$(echo $SPRINT_NUMBER | grep -o '^[0-9]\+')

# Check if base sprint number is not 13
if [[ $BASE_SPRINT != 13 ]]; then
  # if there is middlewares/auth.js or middleware/auth.js or utils/config.js, sprint is 13
  if [ -f middlewares/auth.js ] || [ -f middleware/auth.js ] || [ -f utils/config.js ]; then
    # Preserve the suffix if it was present
    if [[ $SPRINT_NUMBER == *"-ft" ]]; then
      SPRINT_NUMBER="13-ft"
    else
      SPRINT_NUMBER=13
    fi
  fi
fi

# Final validation - check if sprint matches valid options
if [[ ! $SPRINT_NUMBER =~ ^(12|13)(-ft)?$ ]]; then
  print_red "Sprint $SPRINT_NUMBER is not a valid sprint number!"
  print_orange "Valid options are: 12, 13, 12-ft, or 13-ft"
  exit 1
fi

echo "SPRINT_NUMBER=$SPRINT_NUMBER"
echo "BASE_SPRINT=$BASE_SPRINT"

echo "GITHUB_OUTPUT=$GITHUB_OUTPUT"

# if GITHUB_OUTPUT is set, echo the sprint number to the file
if [ -n "$GITHUB_OUTPUT" ]; then
  echo "SPRINT_NUMBER=$SPRINT_NUMBER" >> $GITHUB_OUTPUT
  echo "BASE_SPRINT=$BASE_SPRINT" >> $GITHUB_OUTPUT
else
  print_red "GITHUB_OUTPUT is not set!"
fi

