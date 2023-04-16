/**
 * Gets the current app url. Works on production and developement
 * @param subroute A subroute that will be attached at the end of the base route
 * @example
 * // returns http://localhost:3000/sign-in/ in developement
 * // returns http://{realApplicationDomain}/sign-in/ in production
 * getURL("sign-in")
 */
export function getURL(subroute: string | undefined = undefined) {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";

  // Makes sure to start base url with /
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  if (subroute) {
    url = url + subroute;
  }
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
}
