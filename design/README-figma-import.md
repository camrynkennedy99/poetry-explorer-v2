# Poetry Explorer — Figma Design Library

Two importable files, both extracted directly from `src/App.jsx`:

- **`poetry-explorer.tokens.json`** — colors, typography, spacing, radii, borders, shadows as design tokens.
- **`figma-ui-kit.html`** — the core components (buttons, chips, search bar, result row, browse cards, favorite heart, rail card) plus a color and type-scale reference.

Figma can't open a React file directly, so each piece uses a free plugin to come in as real, editable Figma content.

## 1. Import the tokens (Tokens Studio)

1. In Figma, open the **Tokens Studio for Figma** plugin (install it from the Community tab if you don't have it).
2. Plugin menu → **Settings → use local/JSON**, then **Tools → Import** (or drag the file in).
3. Select `poetry-explorer.tokens.json`. The `global` set loads with color, type, spacing, radius, border, shadow, and composite typography tokens.
4. Click **Create styles / variables** in the plugin to turn the tokens into native Figma color styles, text styles, and variables you can apply anywhere.

## 2. Import the components (html.to.design)

1. Open the **html.to.design** plugin (install from the Community tab).
2. Choose **Import from code / HTML file** and select `figma-ui-kit.html`.
3. The plugin renders the page and rebuilds it as Figma frames — each section (Color, Typography, Buttons, Search Bar, Result Row, Browse Cards, Favorite Heart, Rail Card) becomes a group of editable layers with the real Playfair Display + Inter fonts.
4. Select a component, then right-click → **Create component** to promote it into your library. Apply the styles/variables from step 1 so the kit stays linked to the tokens.

## Notes

- Fonts: **Playfair Display** (display/poem) and **Inter** (UI). Install both locally or enable them in Figma so text renders correctly.
- Components are shown in their key states (default / hover / active) so you can build variants directly.
- Scope is **core components** — assembled screen layouts and edge-case states (loading, error, empty) were intentionally left out. Say the word if you want those added.
