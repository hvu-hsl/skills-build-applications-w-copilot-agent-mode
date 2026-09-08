# OctoFit Tracker — presentation tier

React 19 + Vite + React Router + Bootstrap. Runs on port `5173`.

## Environment variables

`VITE_CODESPACE_NAME` **must be defined** so the app can build the API base URL:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Create `octofit-tracker/frontend/.env.local` (copy from `.env.example`):

```bash
echo "VITE_CODESPACE_NAME=$CODESPACE_NAME" > octofit-tracker/frontend/.env.local
```

If `VITE_CODESPACE_NAME` is unset, [src/api.js](src/api.js) falls back to
`http://localhost:8000` instead of producing a broken `https://undefined-8000…` URL.

Vite only exposes variables at build/start time, so restart the dev server after editing `.env.local`.

## Commands

```bash
npm install --prefix octofit-tracker/frontend
npm run --prefix octofit-tracker/frontend dev
```

## Routes

`/activities`, `/leaderboard`, `/teams`, `/users`, `/workouts` — each fetches
`/api/<resource>/` and accepts either a plain array or a paginated `{ results: [...] }` response.
