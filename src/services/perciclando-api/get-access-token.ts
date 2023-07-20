export function getAccessToken(): string {
  const token = localStorage.getItem('perciclando@accessToken');
  return token ?? '';
}
