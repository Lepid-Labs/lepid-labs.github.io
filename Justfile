# lepid-labs.github.io — Lepid Labs corporate site (static, GitHub Pages)
# Requires: just, node >= 24, pnpm, git, python3 (local preview only)

default:
    @just --list

# Nothing to install: the site has no dependencies. Weft is cloned at build time.
install:
    @echo "No dependencies. 'just build' clones and builds Weft at the ref in weft.ref."

# Build _site/ (clones Lepid-Labs/weft at weft.ref into _build/ on first run)
build:
    scripts/build.sh

# Build against a local Weft checkout that is already built (fast inner loop)
build-local weft="../weft":
    WEFT_DIR={{weft}} WEFT_DIR_SUPPLIED=1 SKIP_WEFT_BUILD=1 scripts/build.sh

# Serve _site/ on http://localhost:8087
serve port="8087":
    python3 -m http.server {{port}} --directory _site

# Run the app: build, then serve
run: build serve

# Development: rebuild from the local Weft checkout, then serve
dev: build-local serve

# Run all checks (the build is the check: a broken page or manifest fails it)
check: build

# Lint: verify every HTML page parses and every internal link resolves
lint: build
    node scripts/check-links.mjs _site

# Nothing to typecheck or test in a static site
typecheck:
    @echo "No TypeScript sources."

test:
    @echo "No test suite. 'just check' builds the site."

# Print the pinned Weft ref
weft-ref:
    @cat weft.ref

# Update weft.ref to the tip of Lepid-Labs/weft main
weft-bump:
    git ls-remote https://github.com/Lepid-Labs/weft.git refs/heads/main | cut -f1 > weft.ref
    @cat weft.ref

# Re-render site/assets/og.png from scripts/og-card.html (needs a Chrome binary)
og-image chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome":
    "{{chrome}}" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
        --virtual-time-budget=8000 --screenshot="$PWD/site/assets/og.png" "file://$PWD/scripts/og-card.html"

# Remove build output
clean:
    rm -rf _build _site site/faq/.weft

# Rebuild from scratch
fresh: clean build
