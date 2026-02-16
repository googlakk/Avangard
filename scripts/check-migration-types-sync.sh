#!/usr/bin/env bash
set -euo pipefail

if [[ "${GITHUB_EVENT_NAME:-}" == "pull_request" ]] && [[ -n "${GITHUB_BASE_REF:-}" ]]; then
  git fetch --no-tags --depth=1 origin "${GITHUB_BASE_REF}"
  DIFF_RANGE="origin/${GITHUB_BASE_REF}...HEAD"
else
  if git rev-parse HEAD^ >/dev/null 2>&1; then
    DIFF_RANGE="HEAD^...HEAD"
  else
    echo "No parent commit found. Skipping migration/types sync check."
    exit 0
  fi
fi

changed_files="$(git diff --name-only "${DIFF_RANGE}")"

if echo "${changed_files}" | grep -Eq '^supabase/migrations/.*\.sql$'; then
  if ! echo "${changed_files}" | grep -qx 'lib/database.types.ts'; then
    echo "Detected migration changes without lib/database.types.ts update."
    echo "Rule: migration-first requires regenerating and committing database types."
    exit 1
  fi
fi

echo "Migration/types sync check passed."

