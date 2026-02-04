
export type HTTPMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE";

export function isHTTPMethod(method: string): method is HTTPMethod {
  return method === "GET"
      || method === "HEAD"
      || method === "POST"
      || method === "PATCH"
      || method === "DELETE";
}