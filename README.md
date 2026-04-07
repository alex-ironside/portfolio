# Portfolio

Static shell that switches between embedded apps via iframes.

## Setup

Initialize submodules:

```
git submodule update --init --recursive
```

## Run locally

```
npx serve .
```

Then open http://localhost:3000/shell/

## Structure

- `shell/` — static shell (index.html, styles.css, main.js) with app switcher
- `shell-stubs/` — local stub pages used by the switcher during development
- `dog tracker/`, `magazyn-patryka/` — git submodules for the individual apps
