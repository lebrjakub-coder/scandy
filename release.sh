#!/usr/bin/env bash
# Přelije hotovou práci z develop do main = spustí deploy na Wedos.
# Použití:  ./release.sh
set -euo pipefail
cd "$(dirname "$0")"

find .git -name "*.lock" -delete 2>/dev/null || true

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Máš neuložené změny. Spusť nejdřív:  ./save.sh \"popis\""
  exit 1
fi

git checkout main
git merge --ff-only develop
git push origin main
git checkout develop

echo ""
echo "main aktualizován — web půjde ven."
