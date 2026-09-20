#!/usr/bin/env bash
set -Eeuo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
compose_file="$script_dir/docker-compose.yml"
env_file="${ENV_FILE:-$script_dir/.env}"

if [[ ! -f "$env_file" ]]; then
  echo "Production environment file not found: $env_file" >&2
  exit 1
fi

env_value() {
  awk -F= -v key="$1" '$1 == key { sub(/^[^=]*=/, ""); print; exit }' "$env_file"
}

data_source="${DATA_SOURCE:-$(env_value DATA_SOURCE)}"
data_source="${data_source:-snapshot}"
sync_content="${SYNC_CONTENT:-$(env_value SYNC_CONTENT)}"
sync_content="${sync_content:-0}"
sync_uploads="${SYNC_UPLOADS:-$(env_value SYNC_UPLOADS)}"
sync_uploads="${sync_uploads:-0}"

case "$data_source" in
  snapshot)
    compose_files=(-f "$compose_file" -f "$script_dir/docker-compose.snapshot.yml")
    ;;
  sqlite)
    compose_files=(-f "$compose_file")
    ;;
  *)
    echo "DATA_SOURCE must be snapshot or sqlite" >&2
    exit 1
    ;;
esac

case "$sync_content" in
  0|1) ;;
  *) echo "SYNC_CONTENT must be 0 or 1" >&2; exit 1 ;;
esac

case "$sync_uploads" in
  0|1) ;;
  *) echo "SYNC_UPLOADS must be 0 or 1" >&2; exit 1 ;;
esac

ENV_FILE="$env_file" docker compose --env-file "$env_file" "${compose_files[@]}" config -q
ENV_FILE="$env_file" docker compose --env-file "$env_file" "${compose_files[@]}" --profile bootstrap run --rm database-init

if [[ "$data_source" == "sqlite" ]]; then
  ENV_FILE="$env_file" MIGRATION_MODE=migrate docker compose --env-file "$env_file" "${compose_files[@]}" --profile migration run --rm migration
  ENV_FILE="$env_file" MIGRATION_MODE=verify docker compose --env-file "$env_file" "${compose_files[@]}" --profile migration run --rm migration
fi

if [[ "$sync_content" == "1" ]]; then
  ENV_FILE="$env_file" docker compose --env-file "$env_file" "${compose_files[@]}" run --rm database-init node prisma/seed.js
fi

ENV_FILE="$env_file" docker compose --env-file "$env_file" "${compose_files[@]}" up -d backend

echo "Production backend started. Run 验证正式环境.sh before switching external traffic."
