# Dark — character graph

Interactive family-tree graph for the cast of Netflix's *Dark* (React 19 + reagraph).

Live: https://dark.aleksander3wielki.workers.dev

## Deploy

```
cd dark
MSYS_NO_PATHCONV=1 npm run build -- --base=/
npx wrangler deploy --assets=dist --name=dark --compatibility-date=2026-09-18
```

---

This repo previously hosted an iframe-shell portfolio. That approach was retired:
each project now deploys on its own, linked from the portfolio hub at
https://alex-ironside.github.io/alex-ironside/
