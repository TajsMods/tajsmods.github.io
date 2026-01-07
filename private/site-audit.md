# Taj's Mod HUB — Site Audit

> **Audit Date:** 2025-12-30  
> **Astro Version:** 5.6.1  
> **Stack:** Astro + Starlight + Tailwind 3.4 + Mermaid

---

## Site Structure Overview

```
docs/
├── src/
│   ├── pages/           # 7 custom pages
│   ├── components/      # 11 Astro components
│   ├── data/            # 6 TypeScript data files
│   ├── layouts/         # 1 BaseLayout
│   ├── styles/          # global.css + starlight-custom.css
│   └── content/docs/    # Starlight markdown docs (35+ files)
├── public/
│   ├── brand/           # TajsModLogo.png, TajsModHeader.png
│   ├── screenshots/     # UI screenshots
│   └── favicon.svg
└── astro.config.mjs     # GitHub Pages config
```

---

## Current Pages & Routes

| Route              | File               | Purpose                                                                 |
| ------------------ | ------------------ | ----------------------------------------------------------------------- |
| `/`                | `index.astro`      | Homepage with Hero, FeatureGrid, GettingStarted, FAQ preview, hub links |
| `/features/`       | `features.astro`   | Full feature explorer with search + category filters                    |
| `/faq/`            | `faq.astro`        | FAQ accordion by category                                               |
| `/changelog/`      | `changelog.astro`  | Version history with GitHub API fallback                                |
| `/roadmap/`        | `roadmap.astro`    | Planned features with GitHub Issues sync                                |
| `/support/`        | `support.astro`    | Support links, donation info                                            |
| `/docs/`           | `docs/index.astro` | Docs hub linking to Starlight content                                   |
| `/documentation/*` | Starlight          | In-depth technical docs (25+ pages)                                     |
| `/404`             | `404.astro`        | Custom 404 page                                                         |

---

## What's Great Already ✅

1. **Modern Stack** — Astro 5.6 static-first, Tailwind, proper TypeScript
2. **BASE_URL Safe** — All links use `import.meta.env.BASE_URL` consistently
3. **Clean Data Layer** — TypeScript interfaces for features, FAQ, changelog, roadmap
4. **GitHub Integration** — Build-time API sync with graceful fallback
5. **Dark Mode** — Proper system-preference detection + toggle
6. **SEO** — OpenGraph, Twitter cards, canonical URLs, meta descriptions
7. **Responsive Design** — Mobile nav, breakpoints, glassmorphism header
8. **Starlight Docs** — Full technical documentation already in place
9. **Component Reuse** — FeatureCard, LinkCard, FAQAccordion are well-abstracted
10. **Feature Search** — Client-side filtering by category + text search

---

## Weak Points / Missing UX ⚠️

### Navigation & Discovery

- **No Command Palette** — Power users can't quickly jump to pages/features
- **No global search** — Feature search is page-local, not site-wide
- **No anchor links** — Can't link to specific FAQ or feature sections
- **No "What's New" banner** — Latest release isn't prominently surfaced on Home

### Content & Automation

- **Changelog is duplicated** — `CHANGELOG.md` (repo root) vs `src/data/changelog.ts` — risk of drift
- **No CHANGELOG.md parsing** — GitHub Releases are fetched, but local CHANGELOG.md isn't parsed at build
- **No troubleshooting page** — FAQ has troubleshooting items but no dedicated diagnostic checklist

### Features & Interactivity

- **Features not clickable** — No individual feature detail pages
- **No screenshots page** — Screenshots exist in `/public/screenshots/` but no gallery
- **No copy-to-clipboard** — Troubleshooting paths/commands aren't easily copyable
- **No "Edit this page" links** — Docs/FAQ/Changelog lack contribution shortcuts

### Feeds & Power Users

- **No RSS/JSON feed** — Changelog/releases aren't syndicated
- **No authenticated routes** — No login/registration for private docs

### Performance & Polish

- **External font** — Inter loaded from Google Fonts (not self-hosted)
- **No 404 handler test** — 404.astro exists but routing may need verification

---

## Data Source Drift Risk

The following content appears in **multiple places** and may drift:

| Content                        | Sources                                                          |
| ------------------------------ | ---------------------------------------------------------------- |
| Changelog                      | `CHANGELOG.md` (root), `src/data/changelog.ts`, GitHub Releases  |
| Features                       | `src/data/features.ts`, various component hardcoding             |
| Links (Steam, GitHub, Discord) | `src/data/links.ts`, `index.astro`, `NavBar.astro`, `Hero.astro` |

**Recommendation:** Single source of truth + build-time generation.

---

## GitHub Pages Deployment Notes

- **Site:** `https://TajemnikTV.github.io`
- **Base:** `/TajsMod`
- **Trailing slash:** `always`
- **Build format:** `directory`

Current config is correct for GitHub Pages subpath deployment.

---

## Environment Variables (Current Support)

| Variable               | Purpose                         | Default              |
| ---------------------- | ------------------------------- | -------------------- |
| `PUBLIC_GITHUB_REPO`   | owner/repo for API calls        | `TajemnikTV/TajsMod` |
| `GITHUB_TOKEN`         | Optional auth for rate limits   | (none)               |
| `PUBLIC_ROADMAP_LABEL` | GitHub Issues label for roadmap | `roadmap`            |

---

## Summary

The site is **well-built and maintainable**. Key improvements should focus on:

1. **Global navigation** via Command Palette
2. **Changelog auto-sync** from local CHANGELOG.md
3. **Individual feature pages** for deeper content
4. **Troubleshooting improvements** with copy buttons
5. **Screenshots gallery page**
