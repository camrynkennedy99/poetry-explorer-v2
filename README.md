# Poetry Explorer

A single-page app for searching and reading classic poetry. Search by title or author, browse a random selection on the home page, save poems to a favorites list, or hit "Surprise me" when you're not sure what you're looking for.

---

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Stack

- **React 19** + **Vite 8**
- **shadcn/ui** — only for Sonner toasts and the Tooltip; everything else is hand-rolled
- **Tailwind CSS v4** — used as the shadcn foundation, not for layout
- **PoetryDB API** — free, no auth. Docs at [poetrydb.org](https://poetrydb.org)

No router, no state library. Everything lives in a single `App` component.

---

## A few notes on how it's built

**Caching** — search results go into a `useRef` map keyed by `field/value`. The author chips are prefetched on mount, staggered 400ms apart to avoid bursting the API. Cache hits are synchronous so there's no loading flash on repeat searches. The obvious next step is React Query — the cache keys already match its query-key convention so the swap would be pretty mechanical.

**No router** — view state is just a string (`home | results | favorites | reading`). The downside is no shareable poem URLs and the back button doesn't work inside the app. That's a known trade-off for a project this size; `react-router` with a `/poem/:title` param would fix it cleanly.

**PoetryDB quirk** — the API returns a JSON object `{ status: 404, reason: "..." }` instead of an actual HTTP 404 when nothing matches. The `Array.isArray()` check in `runSearch` handles both cases so the no-results UI doesn't need to inspect status codes.
