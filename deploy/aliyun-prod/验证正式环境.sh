#!/usr/bin/env bash
set -Eeuo pipefail

: "${VERIFY_BASE_URL:?VERIFY_BASE_URL must be the production base URL}"
VERIFY_ADMIN_URL="${VERIFY_ADMIN_URL:-$VERIFY_BASE_URL}"

curl_args=(-fsS)
if [[ "${CURL_INSECURE:-0}" == "1" ]]; then
  curl_args+=(-k)
fi

curl "${curl_args[@]}" "$VERIFY_BASE_URL/api/health"
curl "${curl_args[@]}" -o /dev/null -w 'admin_http=%{http_code}\n' "$VERIFY_ADMIN_URL/"

echo "HTTP checks passed. Verify data and upload synchronization before external traffic changes."
