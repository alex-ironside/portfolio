# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio is a static shell that embeds several independent apps via iframes. Each app lives in its own git submodule and is built separately; the shell just switches the iframe `src` between pre-built stub directories.

## Architecture

- `shell/` — the static shell: `index.html`, `main.js`, `styles.css`. `main.js` wires header buttons to an `<iframe id="app-frame">`, validating app names against a hardcoded list (`dark`, `dog-tracker`, `magazyn-patryka`) and persisting the last choice to `localStorage` under `portfolio:lastApp`. Adding a new app requires updating both this `valid` list and the header buttons in `index.html`.
- `shell-stubs/<app>/` — built output of each app, committed so the shell can be served standalone without rebuilding submodules. `scripts/build-all.sh` overwrites these from fresh builds.
- `dark/`, `dog tracker/`, `magazyn-patryka/` — git submodules. Note `dog tracker` has a space in its name (quote it in shell commands). `magazyn-patryka` is a CRA-style app (builds to `build/`, needs `PUBLIC_URL=/shell-stubs/magazyn-patryka` so asset paths resolve under the shell). The other two are Vite-style (build to `dist/`).
- `dist/` — final deployable bundle assembled by `build-all.sh`: shell files at root plus a copy of `shell-stubs/`.

## Commands

```bash
# First-time setup
git submodule update --init --recursive

# Local dev — serve repo root, open /shell/
npx serve .

# Full build: submodules + each app + assemble dist/
bash scripts/build-all.sh
```

There is no root-level package.json, lint, or test harness — each submodule has its own tooling.

## Conventions

- Never add `Co-Authored-By` or AI co-authorship lines to commit messages.
