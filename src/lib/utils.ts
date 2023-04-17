/**
 * Gets the current app url. Works on production and developement
 * @param subroute A subroute that will be attached at the end of the base route
 * @example
 * // returns http://localhost:3000/sign-in/ in developement
 * // returns http://{realApplicationDomain}/sign-in/ in production
 * getURL("sign-in")
 */
export function getURL(_subroute: string | undefined = undefined) {
  const isDevelopment = process.env.NODE_ENV === "development";

  const subroute = _subroute !== undefined ? `${_subroute}/` : "";

  if (isDevelopment) {
    return `http://localhost:3000/${subroute}`;
  } else {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${subroute}`;
  }
}
