const TOKEN_KEY = 'auth_token'

// Parse JWT token to get payload
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

// Check if token is expired
export function isTokenExpired(token) {
  if (!token) return true
  const payload = parseJwt(token)
  if (!payload || !payload.exp) return true
  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now()
}

export function getAuthToken() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    // Return null if token is expired
    if (token && isTokenExpired(token)) {
      clearAuthToken()
      return null
    }
    return token
  } catch (e) {
    return null
  }
}

export function setAuthToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch (e) {
    console.error('Failed to save token:', e)
  }
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (e) {
    console.error('Failed to clear token:', e)
  }
}

export function isAuthenticated() {
  const token = getAuthToken()
  return Boolean(token) && !isTokenExpired(token)
}
