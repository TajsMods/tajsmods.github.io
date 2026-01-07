# Site Feature Proposals

> **Proposed:** 2025-12-30  
> **Objective:** High-impact site improvements for UX, automation, and maintainability

---

## Feature Proposals (18 Total)

### A. Ctrl+K Command Palette ⭐

**User Value:** Instant navigation + actions without mouse. Power users love it.  
**Scope:** Large — new component, keyboard listeners, search index  
**Complexity:** M-L  
**Risk:** Low — additive, doesn't break existing nav  
**Dependencies:** None  
**Why Now:** This is the #1 power-user UX pattern on modern sites.

---

### B. Build-time Changelog Auto-Sync from CHANGELOG.md ⭐

**User Value:** Single source of truth, never stale changelog page.  
**Scope:** Medium — build-time parser + data transform  
**Complexity:** M  
**Risk:** Low — fallback already exists  
**Dependencies:** fs read at build time  
**Why Now:** `CHANGELOG.md` already exists and is well-structured. Eliminates drift.

---

### C. Troubleshooting Diagnostic Checklist Page ⭐

**User Value:** Users self-diagnose issues faster, fewer support requests.  
**Scope:** Medium — new page + copy-to-clipboard utilities  
**Complexity:** S-M  
**Risk:** Low  
**Dependencies:** None  
**Why Now:** FAQ has troubleshooting but lacks actionable steps + copyable paths.

---

### D. Lightweight Global Search ⭐

**User Value:** Find anything on the site instantly.  
**Scope:** Medium — search index + overlay UI  
**Complexity:** M  
**Risk:** Low  
**Dependencies:** Could integrate with Command Palette  
**Why Now:** Feature search is page-local. Global search is table-stakes.

---

### E. "What's New" Banner on Homepage ⭐

**User Value:** Immediate awareness of latest release.  
**Scope:** Small — callout component + link to changelog  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** Changelog data  
**Why Now:** Quick win. Latest release is buried; should be surfaced.

---

### F. RSS/JSON Feed for Changelog

**User Value:** Power users can subscribe to updates via RSS readers.  
**Scope:** Small — API route or static JSON  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** Changelog data  
**Why Now:** Low effort, nice-to-have for power users.

---

### G. Individual Feature Detail Pages ⭐

**User Value:** Deep-link to features, SEO benefits, richer content per feature.  
**Scope:** Medium-Large — dynamic routes + content structure  
**Complexity:** M  
**Risk:** Low  
**Dependencies:** features.ts enhancement  
**Why Now:** Features are currently cards only. Expandability matters.

---

### H. Screenshots Gallery Page ⭐

**User Value:** Visual showcase of mod capabilities.  
**Scope:** Small-Medium — gallery page + optional lightbox  
**Complexity:** S-M  
**Risk:** Very low  
**Dependencies:** Screenshots in public/screenshots/  
**Why Now:** Assets exist but aren't showcased.

---

### I. Copy-to-Clipboard Buttons

**User Value:** Easy copying of paths, commands, code snippets.  
**Scope:** Small — utility function + button component  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** None  
**Why Now:** Troubleshooting page needs this.

---

### J. "Edit This Page" / "Report Issue" Links

**User Value:** Lowers friction for contributions.  
**Scope:** Small — computed GitHub URLs  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** GitHub repo URL  
**Why Now:** Standard on OSS docs.

---

### K. Heading Anchor Links with Copy

**User Value:** Deep-linking to specific sections.  
**Scope:** Small — CSS + click handler  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** None  
**Why Now:** Enables sharing specific FAQ/changelog items.

---

### L. Login/Registration System (Private Docs)

**User Value:** Gated content for patrons/contributors.  
**Scope:** Large — auth system, session management, protected routes  
**Complexity:** L  
**Risk:** Medium — requires backend or third-party auth  
**Dependencies:** Supabase/Auth0/Clerk or similar  
**Why Now:** Deferred — low priority for current needs.

---

### M. Keyboard Navigation Focus Styles

**User Value:** Accessibility compliance.  
**Scope:** Small — CSS focus states  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** None  
**Why Now:** Already partially done; needs polish.

---

### N. Self-hosted Fonts

**User Value:** Faster load, privacy, no external dependency.  
**Scope:** Small — download fonts, update CSS  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** None  
**Why Now:** Minor performance win.

---

### O. Last Updated Timestamps

**User Value:** Know when content was last modified.  
**Scope:** Small — git log or frontmatter dates  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** git info at build time  
**Why Now:** Nice for docs credibility.

---

### P. Mobile Command Palette Alternative

**User Value:** Quick nav on touch devices.  
**Scope:** Medium — swipe menu or floating action button  
**Complexity:** M  
**Risk:** Low  
**Dependencies:** Base palette implementation  
**Why Now:** After desktop palette.

---

### Q. Feature Comparison Table

**User Value:** At-a-glance view of all features.  
**Scope:** Small — table component  
**Complexity:** S  
**Risk:** Very low  
**Dependencies:** features.ts  
**Why Now:** Alternative view for features page.

---

### R. Offline Support (PWA)

**User Value:** Access docs without internet.  
**Scope:** Large — service worker, manifest, caching  
**Complexity:** L  
**Risk:** Medium  
**Dependencies:** None  
**Why Now:** Nice-to-have, not urgent.

---

## Priority Matrix

| Impact \ Effort | Low (S)                                  | Medium (M)                                            | High (L)         |
| --------------- | ---------------------------------------- | ----------------------------------------------------- | ---------------- |
| **High**        | E: What's New Banner, I: Copy Buttons    | A: Command Palette, D: Global Search                  | G: Feature Pages |
| **Medium**      | F: RSS Feed, J: Edit Links, K: Anchors   | B: Changelog Sync, C: Troubleshooting, H: Screenshots | L: Login System  |
| **Low**         | M: Focus Styles, N: Fonts, O: Timestamps | P: Mobile Palette, Q: Comparison Table                | R: PWA           |

---

## Top 6 Prioritized Features

Based on **impact vs effort**, implement these first:

| Rank | Feature                          | Impact | Effort | Notes                                  |
| ---- | -------------------------------- | ------ | ------ | -------------------------------------- |
| 1    | **A. Command Palette**           | High   | M      | Core power-user feature, enables D too |
| 2    | **B. Changelog Auto-Sync**       | High   | M      | Eliminates drift, build-time only      |
| 3    | **E. What's New Banner**         | High   | S      | Quick win, surfaces latest release     |
| 4    | **C. Troubleshooting Checklist** | High   | S-M    | Reduces support burden                 |
| 5    | **G. Feature Detail Pages**      | High   | M-L    | Clickable features, SEO, deep content  |
| 6    | **H. Screenshots Gallery**       | Medium | S-M    | Visual appeal, easy to implement       |

---

## Features to Implement Immediately (3-5)

### ✅ Will Implement Now:

1. **Command Palette (A)** — With integrated global search (D)
2. **Changelog Auto-Sync (B)** — Parse CHANGELOG.md at build time
3. **What's New Banner (E)** — Homepage callout
4. **Troubleshooting Page (C)** — With copy buttons (I)
5. **Screenshots Gallery (H)** — New page with gallery

### 🔜 Nice-to-Have (if time permits):

- RSS/JSON feed (F)
- Edit/Report links (J)
- Heading anchors with copy (K)

### ⏳ Deferred:

- Individual Feature Pages (G) — Larger scope, separate effort
- Login/Registration (L) — Requires auth infrastructure
- PWA (R) — Out of scope for now

---

## Authentication Considerations (Login/Registration)

For future private docs, options include:

| Provider            | Pros                              | Cons                       |
| ------------------- | --------------------------------- | -------------------------- |
| **Supabase**        | Free tier, PostgreSQL, easy setup | Self-managed               |
| **Clerk**           | Drop-in components, social login  | Cost at scale              |
| **Auth0**           | Enterprise-grade, extensive flows | Complex for simple needs   |
| **GitHub OAuth**    | Natural for OSS contributors      | GitHub-only                |
| **Simple Password** | Zero external deps                | Not scalable, no user mgmt |

**Recommendation:** Start with Clerk or Supabase if/when private docs become a priority. For now, docs remain public.
