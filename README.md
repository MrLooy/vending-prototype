# VENDIPRO — Vending Machine Route & Restock Prototype

A mobile-first React prototype that digitizes the daily route of a vending-machine
operator. It records machine temperature, error reports, sales/cash photos, restock
quantities and cash collection, and generates a ready-to-send **WhatsApp report** at
every step.

> All sample data in this repository (machine names, addresses, people, product
> counts) is **fictional** and for demonstration only.

## Problem

Field operators restock vending machines and report back over WhatsApp as free-form
text plus photos. That is error-prone: inconsistent formats, photos that go missing,
and no structured history to audit. The prototype enforces a fixed, guided flow and
produces a consistent report automatically.

## Features

- **Three role views:** Operario (field), Almacén (warehouse) and Admin.
- **5-step guided visit:** temperature → sales photos → restock list → final photos → cash close.
- **Restock list** over a product-like catalog with category filters and `+ / −` counters.
- **Auto-generated WhatsApp report** (copy or open in WhatsApp) with per-product counts,
  totals and cash collected.
- **Camera photo capture** with inline previews and required-photo validation.
- **Local history** (`localStorage`) plus an admin dashboard with aggregated metrics
  and report re-send.
- Responsive, mobile-first UI.

## Tech stack

| Area | Technology |
|---|---|
| UI | React 19 |
| Build tool / dev server | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Linting | Oxlint |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite)
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # run Oxlint
```

## Project structure

```
index.html             Vite HTML entry point
src/main.jsx           React root
src/App.jsx            Entire prototype: roles, 5-step flow, WhatsApp report
src/App.css, index.css Styling helpers
vite.config.js         Vite + React + Tailwind plugins
public/                Static assets (favicon, icons)
```

## Notes

- Fully **client-side prototype**: there is no backend; the visit history lives in the
  browser's `localStorage`.
- The product catalog and restock numbers are sample data, not real inventory.

## Credits

Built by **Loy (MrLooy)**.

## License

MIT — see [LICENSE](LICENSE).
