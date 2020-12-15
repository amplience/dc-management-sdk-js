/**
 * @hidden
 */
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

/**
 * @hidden
 */
export function combineURLs(baseURL: string, relativeURL: string): string {
  if (isAbsoluteURL(relativeURL)) {
    return relativeURL;
  } else {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  }
}
