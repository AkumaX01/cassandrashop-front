const API_URL = `https://v2.shop.ernestorb.com`;

export function getUrl(path: string) {
  return new URL(path, API_URL).toString();
}
