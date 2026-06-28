export const DEWEB_GITHUB_REPO = "https://github.com/armcoincrypto/Deweb";

export function githubDocUrl(path: string): string {
  return `${DEWEB_GITHUB_REPO}/blob/main/${path}`;
}
