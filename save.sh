#!/usr/bin/env bash
# Uloží rozdělanou práci na aktuální větev (normálně develop).
# Použití:  ./save.sh "popis změny"
set -euo pipefail
cd "$(dirname "$0")"

# uklidí zámky, které po sobě může nechat cizí git proces
find .git -name "*.lock" -delete 2>/dev/null || true

branch="$(git branch --show-current)"
msg="${1:-Průběžné úpravy}"

git add -A

if git diff --cached --quiet; then
  echo "Žádné změny k uložení."
  exit 0
fi

git commit -m "$msg"
git push -u origin "$branch"

echo ""
echo "Uloženo na větev '$branch'."
