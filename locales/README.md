# MaplePath UI languages

Supported locales: `zh-Hans` (Simplified Chinese), `zh-Hant` (Traditional Chinese), and `en` (English).

The existing Simplified Chinese UI is the canonical source. `en.json` contains maintained English phrases; `zh-Hant.json` contains bundled Traditional Chinese phrases. The latter were initially generated with opencc-js 1.3.1 (cn → tw), then stored locally. There is no runtime translation API, CDN dependency or language service fee. Legal/course information has not changed.

After editing both catalogs, run:

```powershell
node scripts/build-locales.mjs
node --test tests/*.test.mjs
```

`dist/i18n-core.js` uses longest-match phrase substitution; `dist/i18n.js` translates visible text, placeholders, accessibility labels, document titles, confirmation dialogs and dynamic UI updates. It remembers the choice in `maplepath-language`, sets the document `lang`, and restores original text when switching back. Existing English decorative headings and official BC course names remain English.

The language switcher is available in public navigation and the student header. Switching does not re-render forms, so current input values are preserved. Option values are pinned before their labels change; canonical Chinese status/identity values remain unchanged for compatibility with existing data and rule checks. User input values and exported JSON are not translated. Canonical identifiers are intentionally independent of display language.

`search-normalization.json` supports Traditional Chinese university search. `data-no-translate` can protect future user-generated text sections from UI translation. New personal narrative displays should use that attribute; this prototype currently only has predefined categorical fields and numbers.

Coverage tests check the existing application source phrases. When adding a new UI phrase, add it to both catalogs and rerun the bundle script. Consider explicit semantic message IDs when migrating the static prototype to a component framework.

Third-party attribution: opencc-js is MIT licensed; see `locales/licenses/`. Third-party dictionary notices are preserved as well. The converter is a development-time tool only and is not shipped as an application dependency.
