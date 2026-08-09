#!/usr/bin/env bash
set -Eeuo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
compose_file="$script_dir/docker-compose.yml"
env_file="${ENV_FILE:-$script_dir/.env}"

if [[ ! -f "$env_file" ]]; then
  echo "Cloud test environment file not found: $env_file" >&2
  exit 1
fi

ENV_FILE="$env_file" docker compose --env-file "$env_file" -f "$compose_file" config -q
ENV_FILE="$env_file" docker compose --env-file "$env_file" -f "$compose_file" --profile bootstrap run --rm database-init
ENV_FILE="$env_file" MIGRATION_MODE=migrate docker compose --env-file "$env_file" -f "$compose_file" --profile migration run --rm migration
ENV_FILE="$env_file" MIGRATION_MODE=verify docker compose --env-file "$env_file" -f "$compose_file" --profile migration run --rm migration
ENV_FILE="$env_file" docker compose --env-file "$env_file" -f "$compose_file" up -d backend

echo "Backend started. Run 验证测试环境.sh before switching any external traffic."
