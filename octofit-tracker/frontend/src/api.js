// VITE_CODESPACE_NAME must be defined (see .env.local) when running in GitHub Codespaces.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

/** Accepts both plain arrays and paginated `{ results: [...] }` payloads. */
export function toList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export async function fetchList(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed with status ${response.status}`);
  }

  return toList(await response.json());
}
