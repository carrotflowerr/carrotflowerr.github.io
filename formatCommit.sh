#!/bin/bash

# Check if input is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 '<commit log>'"
    exit 1
fi

# Read the commit log from the input argument
commit_log="$1"

# Extract the commit hash, author, date, and message using regex
if [[ $commit_log =~ commit\ ([0-9a-f]{40}) ]]; then
    commit_hash="${BASH_REMATCH[1]}"
else
    echo "Error: Commit hash not found."
    exit 1
fi

if [[ $commit_log =~ Author:\ (.+\ <.+>) ]]; then
    author="${BASH_REMATCH[1]}"
else
    echo "Error: Author not found."
    exit 1
fi

if [[ $commit_log =~ Date:\ (.+) ]]; then
    date="${BASH_REMATCH[1]}"
else
    echo "Error: Date not found."
    exit 1
fi

# Capture the commit message, allowing for multiple lines
if [[ $commit_log =~ \n\n(.*) ]]; then
    message="${BASH_REMATCH[1]}"
    # Remove leading whitespace from the message
    message=$(echo "$message" | sed 's/^[ \t]*//;s/[ \t]*$//')
else
    echo "Error: Commit message not found."
    exit 1
fi

# Format the output as HTML
output="<div class=\"commit\">\n"
output+="    <h3>Commit: $commit_hash</h3>\n"
output+="    <div class=\"author\">Author: $author</div>\n"
output+="    <div class=\"date\">Date: $date</div>\n"
output+="    <div class=\"message\">$message</div>\n"
output+="</div>"

# Print the formatted output
echo -e "$output"
