/**
 * In-memory access token for REST calls via {@link ./httpClient}.
 * Persist (e.g. localStorage) only when product security review allows it.
 */
let accessToken: string | null = null

export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string | null): void {
  accessToken = token
}

export function clearTokens(): void {
  accessToken = null
}
