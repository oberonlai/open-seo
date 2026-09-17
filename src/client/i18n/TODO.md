# i18n coverage TODO

Shipped in `feat/zh-tw-i18n`:

- Lightweight catalogs (`en`, `zh-TW`) + `t` / `useT`
- Locale detection: `localStorage` override, else `navigator.languages` / `navigator.language`
  - `zh-TW` / `zh-Hant` / `zh-HK` / `zh-MO` / bare `zh` → Traditional Chinese
  - `zh-CN` / `zh-Hans` → English fallback (no Simplified catalog)
- Language switcher: Settings → Appearance, and account menu
- Wired UI: sidebar/nav, theme, settings (personal + API keys), shell DataForSEO banners/modal, NotFound, standard error codes, auth method chooser, post-signup onboarding (steps 0–2 chrome + option labels)

Still English (follow-up):

- Deep feature screens: keywords, rank tracking, domain, backlinks, audit, brand lookup, prompt explorer, SAM chat, GSC/GA4, billing, team/org settings
- Auth form field labels / validation copy on sign-in & sign-up routes (chooser is done)
- Project switcher empty/create copy, dashboard card titles/empty states
- Help pages, support page body, OAuth consent, invitation flows
- Table chrome (pagination, bulk actions, export), location comboboxes
- Marketing `web/` site (separate app)

When extending: add keys to `locales/en.ts` first, mirror in `zh-TW.ts` (Traditional Taiwanese Chinese only), then replace hardcoded UI strings with `useT()` / `t()`.
