# Structural Bioinformatics in Julia Website

Public website for the JuliaStructBio organization.

## Stack

- Next.js App Router
- TypeScript
- Static export for GitHub Pages
- Content-driven sections via `content.toml`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editing content

Most page content is in `content.toml`:

- site metadata and hero copy
- focus areas
- package cards and capability filters
- talks list
- community links

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

GitHub Actions workflow in `.github/workflows/deploy.yml` publishes the `out/` directory to GitHub Pages on pushes to `main`.

Selected repository target: `JuliaStructBio.github.io`.

This repository name enables organization root Pages hosting at:

`https://juliastructbio.github.io/`

GitHub settings checklist:

1. Repository: `JuliaStructBio.github.io`
2. Branch: `main`
3. Pages source: `GitHub Actions`
4. Ensure the workflow `.github/workflows/deploy.yml` is enabled

For non-root project repositories, the config automatically applies `basePath` and `assetPrefix` during GitHub Actions builds.
