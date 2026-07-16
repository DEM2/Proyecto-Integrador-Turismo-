import { apiUrl } from "./apiConfig.js";

export async function getAdminDashboardData() {
  const response = await fetch(apiUrl("/api/admin-dashboard"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener la informacion del dashboard");
  }

  const payload = await response.json();

  return payload?.data ?? {
    counts: {
      users: 0,
      events: 0,
      places: 0,
      reviews: 0,
      pendingOrganizers: 0,
    },
    pendingOrganizers: [],
    recentReviews: [],
  };
}
