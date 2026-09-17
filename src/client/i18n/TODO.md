# i18n coverage TODO

Shipped in `feat/zh-tw-i18n`:

- Lightweight catalogs (`en`, `zh-TW`) + `t` / `useT`
- Locale detection: `localStorage` override, else `navigator.languages` / `navigator.language`
  - `zh-TW` / `zh-Hant` / `zh-HK` / `zh-MO` / bare `zh` → Traditional Chinese
  - `zh-CN` / `zh-Hans` → English fallback (no Simplified catalog)
- Language switcher: Settings → Appearance, and account menu
- Wired UI: sidebar/nav, theme, settings (personal + API keys), shell DataForSEO banners/modal, NotFound, standard error codes, auth method chooser, post-signup onboarding (steps 0–2 chrome + option labels)

Shipped in deep SEO feature pass (zh-TW):

- Keyword research: page title/subtitle, search bar, modes, clickstream, empty/no-data states
- Saved keywords: header, actions/export, empty states, key column labels
- Rank tracking: page title/subtitle, tracked domains list/empty, detail configure/add keywords, position distribution
- Domain overview: title/subtitle, search placeholder, empty/history
- Backlinks: title/subtitle, empty/history, overview chart titles, error state
- Site audit: title, launch form, history table chrome, result stats strip
- GSC: connection card titles/toasts/errors, re-engagement modal chrome
- Dashboard cards: Search performance, Site audit, Backlink pulse, GA4 organic traffic metrics

Still English (follow-up):

- Deeper table chrome / filter panels / bulk bars across features (partially done)
- Brand lookup, prompt explorer, SAM chat, billing, team/org settings
- Auth form field labels / validation copy on sign-in & sign-up routes (chooser is done)
- Project switcher empty/create copy, dashboard onboarding checklist body
- Help pages, support page body, OAuth consent, invitation flows
- Location comboboxes, rank-tracking config modal full copy
- Marketing `web/` site (separate app)

When extending: add keys to `locales/en.ts` first, mirror in `zh-TW.ts` (Traditional Taiwanese Chinese only), then replace hardcoded UI strings with `useT()` / `t()`.
