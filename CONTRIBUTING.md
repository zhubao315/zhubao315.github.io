# Contributing

Thanks for your interest in improving the ZHUBAO portfolio site. This is a personal static site, so changes are best kept small, factual, and easy to review.

## Local setup

Requirements: Node.js **22.23.4+** and npm.

```bash
npm ci
npm run dev
```

The brand-asset helper script additionally needs Python and the pinned dependency from `scripts/requirements.txt`:

```bash
python3 -m pip install -r scripts/requirements.txt
```

## Before opening a pull request

Run the same checks CI runs:

```bash
npm run build          # includes astro check (type checking)
npm run test:links     # required routes + root-relative internal links
npx playwright test    # 32 browser tests (needs `npx playwright install chromium` locally)
```

All 14 required compatibility routes and the existing 2022 Hexo URLs must keep resolving. Do not remove or rewrite the preserved `noindex` pages.

## Content rules

- Project facts live in `src/data/projects.ts` and `src/data/site.ts`; do not duplicate them in components.
- Keep the evidence rules in the [README](README.md#evidence-rules) and the [content manifest](docs/content-manifest.md): every claim needs a public source and a verification date.
- Forks and upstream research must never be presented as original work.
- Brand assets in `public/brand/` are strict pixel slices from the approved identity board. Do not redraw, recolor, or regenerate the logo with an image model. Some large binaries appear in both `01-LOGO/` and `slices/`; they are byte-identical and should be deduplicated centrally, not edited in place (see `public/brand/README.md`).

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`. The Pages source is **GitHub Actions**. Do not add secrets or third-party runtime scripts.

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE). © 2026 朱宝.
