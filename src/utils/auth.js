export function setAuthState(state) {
  if (state) {
    sessionStorage.setItem('hirehub_admin_auth', 'true');
  } else {
    sessionStorage.removeItem('hirehub_admin_auth');
  }
}

export function getAuthState() {
  return sessionStorage.getItem('hirehub_admin_auth') === 'true';
}

export function clearAuthState() {
  sessionStorage.removeItem('hirehub_admin_auth');
}