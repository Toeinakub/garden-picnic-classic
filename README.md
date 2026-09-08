# CMA Garden Picnic Night

A friendly garden gathering and take-home fruit basket prototype.

**Live demo:** https://toeinakub.github.io/garden-picnic-classic/

Select from nine fruits, personalise a basket, and preview the checkout and collection token.
Features a cream-and-leaf-green theme, animated hanging string lights and a 2D wicker basket.
The former 3D experiment has been removed; its source remains in Git history.

This is a presentation prototype. Prices are illustrative. QR checkout simulates payment;
it does not process or verify real transactions. Without Supabase configuration, simulated
orders are stored only in the current browser.

## Local development

Requires Node.js 22.

```sh
npm ci
npm run dev
```

## Deployment

Push to main to build and publish through .github/workflows/pages.yml.
GitHub Pages uses GitHub Actions as its publishing source.

To reproduce the Pages build:

```sh
VITE_BASE_PATH=/garden-picnic-classic/ npm run build
npm run preview
```

Reference media, local backups, dependencies and environment secrets are excluded from Git.
