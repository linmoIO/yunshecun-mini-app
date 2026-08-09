#!/usr/bin/env bash
set -Eeuo pipefail

: "${SOURCE_SQLITE_PATH:?SOURCE_SQLITE_PATH must point to the current SQLite database}"
: "${SOURCE_UPLOAD_DIR:?SOURCE_UPLOAD_DIR must point to the current uploads directory}"
: "${MIGRATION_BACKUP_DIR:?MIGRATION_BACKUP_DIR must point to a new backup directory}"

if [[ ! -f "$SOURCE_SQLITE_PATH" || ! -d "$SOURCE_UPLOAD_DIR" ]]; then
  echo "SQLite source or upload source does not exist" >&2
  exit 1
fi
if [[ -e "$MIGRATION_BACKUP_DIR" ]]; then
  echo "Migration backup directory already exists: $MIGRATION_BACKUP_DIR" >&2
  exit 1
fi

mkdir -p "$MIGRATION_BACKUP_DIR"
cp --preserve=mode,timestamps "$SOURCE_SQLITE_PATH" "$MIGRATION_BACKUP_DIR/旧数据.sqlite"
cp -a "$SOURCE_UPLOAD_DIR" "$MIGRATION_BACKUP_DIR/上传文件"

(
  cd "$MIGRATION_BACKUP_DIR"
  sha256sum 旧数据.sqlite
  find 上传文件 -type f -print0 | sort -z | xargs -0 sha256sum
) > "$MIGRATION_BACKUP_DIR/校验清单.sha256"

echo "Migration source backup created: $MIGRATION_BACKUP_DIR"
