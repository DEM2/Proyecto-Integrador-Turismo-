import { apiUrl } from "./apiConfig.js";

let adminDashboardDataPromise = null;

export async function getAdminDashboardData() {
  if (adminDashboardDataPromise) {
    return adminDashboardDataPromise;
  }

  adminDashboardDataPromise = fetchAdminDashboardData();
  return adminDashboardDataPromise;
}

async function fetchAdminDashboardData() {
  const response = await fetch(apiUrl("/api/admin-dashboard"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener la informacion del dashboard");
  }

  const payload = await response.json();

  return payload?.data ?? {};
}
