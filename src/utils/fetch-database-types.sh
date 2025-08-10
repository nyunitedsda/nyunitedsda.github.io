#!/bin/bash

set -e

url="http://127.0.0.1:3000/api/types"
outfile="src/api/request/databaseTypes.ts"

echo "Requesting types from $url..."

response=$(curl -s -w "%{http_code}" "$url")
http_code="${response: -3}"
body="${response::-3}"

if [ "$http_code" = "200" ]; then
  echo "$body" > "$outfile"
  echo "Types written to $outfile."
  echo "Formatting $outfile..."
  npm run format "$outfile"
else
  echo "Failed to fetch types. HTTP status: $http_code"
  exit 1
fi
