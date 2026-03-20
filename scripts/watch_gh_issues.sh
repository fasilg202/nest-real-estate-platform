#!/bin/bash
set -euo pipefail

REPO="$1"
LABEL="${2:-openclaw}"
INTERVAL="${3:-5}"

LOG="$HOME/.gh_watch_${REPO//\//_}.log"

echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) - Watching repo $REPO for label '$LABEL' every ${INTERVAL}m. Logs: $LOG" >> "$LOG"

LAST_EPOCH_FILE="$HOME/.gh_watch_${REPO//\//_}.epoch"
LAST_EPOCH=$([ -f "$LAST_EPOCH_FILE" ] && cat "$LAST_EPOCH_FILE" || echo "0")

while true; do
  RESP=$(gh api "search/issues?q=repo:${REPO}+label:${LABEL}+is:issue+updated:>${LAST_EPOCH}" 2>/dev/null || echo '{"items":[]}')
  
  if [ -n "$RESP" ]; then
    NEW_ITEMS=$(echo "$RESP" | jq -r '.items[] | "* #" + (.number|tostring) + " " + .title + " (" + .html_url + ")"' 2>/dev/null || echo "")
    
    if [ -n "$NEW_ITEMS" ]; then
      echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) - New/updated issues:" >> "$LOG"
      echo "$NEW_ITEMS" >> "$LOG"
    fi
    
    NEW_EPOCH=$(echo "$RESP" | jq -r '.items[0].updated_at' 2>/dev/null || echo "")
    if [ -n "$NEW_EPOCH" ] && [ "$NEW_EPOCH" != "null" ]; then
      date -u -d "$NEW_EPOCH" +%s > "$LAST_EPOCH_FILE" 2>/dev/null || echo "$NEW_EPOCH" > "$LAST_EPOCH_FILE"
    fi
  fi
  
  sleep "${INTERVAL}m"
done
