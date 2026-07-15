const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export function apiUrl(endpoint) {
  if (!API_URL) {
    throw new Error("VITE_API_URL no esta configurada");
  }

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const endpointPath =
    API_URL.endsWith("/api") && normalizedEndpoint.startsWith("/api/")
      ? normalizedEndpoint.replace("/api", "")
      : normalizedEndpoint;

  return `${API_URL}${endpointPath}`;
}
