import { apiUrl } from "./apiConfig.js";

let adminDashboardDataPromise = null;

const emptyAdminDashboardData = {
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

export async function getAdminDashboardData() {
  if (adminDashboardDataPromise) {
    return adminDashboardDataPromise;
  }

  adminDashboardDataPromise = fetchAdminDashboardData().catch((error) => {
    console.error(error);
    adminDashboardDataPromise = null;
    return emptyAdminDashboardData;
  });

  return adminDashboardDataPromise;
}

export async function hideAdminDashboardReview(reviewType, reviewId) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/reviews/${reviewType}/${reviewId}`), {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al ocultar la resena");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function showAdminDashboardReview(reviewType, reviewId) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/reviews/${reviewType}/${reviewId}/show`), {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al mostrar la resena");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function getAdminDashboardAllReviews() {
  const response = await fetch(apiUrl("/api/admin-dashboard/reviews"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las resenas");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

async function fetchAdminDashboardData() {
  const response = await fetch(apiUrl("/api/admin-dashboard"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener la informacion del dashboard");
  }

  const payload = await response.json();

  return payload?.data ?? emptyAdminDashboardData;
}
