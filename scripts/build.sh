#!/usr/bin/env bash
# Assemble the deployable site into _site/.
#
# Weft is not on npm, so the embed bundle comes from a checkout of
# Lepid-Labs/weft pinned by weft.ref. Set WEFT_DIR to reuse an existing
# checkout; set SKIP_WEFT_BUILD=1 when its packages are already built.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF="$(tr -d '[:space:]' < "$ROOT/weft.ref")"
BUILD="$ROOT/_build"
SITE="$ROOT/_site"
WEFT_DIR="${WEFT_DIR:-$BUILD/weft}"

log() { printf '\n== %s\n' "$*"; }

# 1. Weft checkout at the pinned ref (only when not supplied).
if [ -z "${WEFT_DIR_SUPPLIED:-}" ] && [ "$WEFT_DIR" = "$BUILD/weft" ]; then
	log "weft checkout @ $REF"
	if [ ! -d "$WEFT_DIR/.git" ]; then
		git clone --quiet https://github.com/Lepid-Labs/weft.git "$WEFT_DIR"
	fi
	git -C "$WEFT_DIR" fetch --quiet origin "$REF"
	git -C "$WEFT_DIR" checkout --quiet "$REF"
fi

# 2. Build @weft/core and the embed bundle.
if [ -z "${SKIP_WEFT_BUILD:-}" ]; then
	log "build weft"
	(
		cd "$WEFT_DIR"
		pnpm install --frozen-lockfile
		pnpm --filter @weft/core build
		pnpm --filter @weft/ui exec svelte-kit sync
		pnpm --filter @weft/embed build
	)
fi

# 3. Stage Weft's docs under our own config and index both corpora.
log "manifests"
rm -rf "$BUILD/weft-docs"
mkdir -p "$BUILD/weft-docs/docs"
cp "$WEFT_DIR"/docs/*.md "$BUILD/weft-docs/docs/"
cp "$ROOT/config/weft-docs.config.yaml" "$BUILD/weft-docs/weft.config.yaml"
node "$ROOT/scripts/gen-manifest.mjs" "$WEFT_DIR" "$BUILD/weft-docs"
node "$ROOT/scripts/gen-manifest.mjs" "$WEFT_DIR" "$ROOT"

# 4. Assemble.
log "assemble $SITE"
rm -rf "$SITE"
cp -R "$ROOT/site" "$SITE"
cp -R "$BUILD/weft-docs/docs/." "$SITE/docs/"
cp "$WEFT_DIR/packages/embed/dist/weft.iife.js" "$WEFT_DIR/packages/embed/dist/weft.css" "$SITE/"
touch "$SITE/.nojekyll"
echo "weft: $REF" > "$SITE/build.txt"
find "$SITE" -type f | sort | sed "s|$SITE/||"
