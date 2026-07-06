#!/bin/sh
set -eu

# ---------------------------------------------------------------------------
# Runtime injection of NEXT_PUBLIC_* variables.
#
# Next.js inlines NEXT_PUBLIC_* env vars into the client bundle at BUILD time,
# so they can't normally change without rebuilding. To make one image work in
# any environment (built locally via full.yml OR pulled from the registry via
# production.yml), the image is built with placeholder tokens (see Dockerfile)
# and this script replaces them with the real values from the container
# environment (.env via docker compose) before the server starts.
#
# NOTE: substitution is in-place. A plain container *restart* keeps the values
# from the first start; changing a value requires recreating the container
# (`docker compose up -d` recreates from the image, restoring the tokens).
# ---------------------------------------------------------------------------

substitute() {
  token="$1"
  value="$2"
  # Escape characters that are special on the sed replacement side (\ & |).
  escaped=$(printf '%s' "$value" | sed -e 's/[\\&|]/\\&/g')
  find /app/.next /app/public -type f \( -name '*.js' -o -name '*.html' -o -name '*.json' \) \
    -exec sed -i "s|${token}|${escaped}|g" {} +
}

substitute "__RUNTIME_NEXT_PUBLIC_HANKO_API_URL__" "${NEXT_PUBLIC_HANKO_API_URL:-}"
substitute "__RUNTIME_NEXT_PUBLIC_BDT_API_URL__" "${NEXT_PUBLIC_BDT_API_URL:-}"

exec "$@"
