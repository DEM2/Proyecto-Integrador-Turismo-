import { getAdminDashboardData } from "../../services/adminDashboard.service.js";
import {
  renderAdminDashboardAllUsers,
  renderAdminDashboardAllUsersEvents,
} from "./adminDashboardAllUsers.js";
import {
  renderAdminDashboardAllEvents,
  renderAdminDashboardAllEventsEvents,
} from "./adminDashboardAllEvents.js";
import {
  renderAdminDashboardAllPlaces,
  renderAdminDashboardAllPlacesEvents,
} from "./adminDashboardAllPlaces.js";
import {
  renderAdminDashboardAllReviews,
  renderAdminDashboardAllReviewsEvents,
  renderAdminDashboardBackEvent,
} from "./adminDashboardAllReviews.js";

function formatCount(value) {
  return Number(value ?? 0);
}

export async function renderAdminDashboardMetricCards() {
  const dashboardData = await getAdminDashboardData();
  const counts = dashboardData.counts || {};

  const totalUsers = counts.users || 0;
  const totalEvents = counts.events || 0;
  const totalPlaces = counts.places || 0;
  const totalReviews = counts.reviews || 0;
  const totalPendingOrganizers = counts.pendingOrganizers || 0;

  return `
    <section aria-label="Resumen de metricas" class="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <header class="flex items-center gap-2">
          <svg aria-hidden="true" class="size-8 rounded-full bg-blue-100 p-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5 1.34 3.5 3 3.5ZM8 11c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm8 0c-.33 0-.7.02-1.1.06 1.33.96 2.1 2.18 2.1 3.94v2h7v-2c0-2.66-5.33-4-8-4Z" />
          </svg>
          <h2 class="text-sm font-bold text-slate-800">Usuarios</h2>
        </header>
        <div class="mt-2 flex items-baseline gap-2"><strong class="text-2xl font-extrabold">${formatCount(totalUsers)}</strong><span class="text-xs font-medium text-slate-500">Total registrados</span></div>
        <button type="button" data-show-all-users="true" class="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-lg p-1 text-xs font-bold text-blue-700 transition hover:bg-sky-100">
          Ver usuarios <span aria-hidden="true">&rarr;</span>
        </button>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <header class="flex items-center gap-2">
          <svg aria-hidden="true" class="size-8 rounded-full bg-emerald-100 p-2 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.57-6 3.5V20h7.26a6.5 6.5 0 0 1-.26-1.82 6.42 6.42 0 0 1 1.28-3.86A9.84 9.84 0 0 0 12 14Zm7.5 1.5.47 1.45h1.53l-1.24.9.47 1.45-1.23-.9-1.24.9.48-1.45-1.24-.9h1.53l.47-1.45Z" />
          </svg>
          <h2 class="text-sm font-bold text-slate-800">Eventos</h2>
        </header>
        <div class="mt-2 flex items-baseline gap-2"><strong class="text-2xl font-extrabold">${formatCount(totalEvents)}</strong><span class="text-xs font-medium text-slate-500">Total eventos</span></div>
        <button type="button" data-show-all-events="true" class="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-lg p-1 text-xs font-bold text-emerald-600 transition hover:bg-emerald-100">
          Ver eventos <span aria-hidden="true">&rarr;</span>
        </button>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <header class="flex items-center gap-2">
          <svg aria-hidden="true" class="size-8 rounded-full bg-violet-100 p-2 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h2 class="text-sm font-bold text-slate-800">Sitios</h2>
        </header>
        <div class="mt-2 flex items-baseline gap-2"><strong class="text-2xl font-extrabold">${formatCount(totalPlaces)}</strong><span class="text-xs font-medium text-slate-500">Total sitios</span></div>
        <button type="button" data-show-all-places="true" class="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-lg p-1 text-xs font-bold text-violet-600 transition hover:bg-violet-100">
          Ver sitios <span aria-hidden="true">&rarr;</span>
        </button>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <header class="flex items-center gap-2">
          <svg aria-hidden="true" class="size-8 rounded-full bg-amber-100 p-2 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
          </svg>
          <h2 class="text-sm font-bold text-slate-800">Resenas</h2>
        </header>
        <div class="mt-2 flex items-baseline gap-2"><strong class="text-2xl font-extrabold">${formatCount(totalReviews)}</strong><span class="text-xs font-medium text-slate-500">Total resenas</span></div>
        <button type="button" data-show-all-reviews="true" class="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-lg p-1 text-xs font-bold text-amber-500 transition hover:bg-amber-100">
          Ver resenas <span aria-hidden="true">&rarr;</span>
        </button>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <header class="flex items-center gap-2">
          <svg aria-hidden="true" class="size-8 rounded-full bg-orange-100 p-2 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect width="8" height="4" x="8" y="2" rx="1" />
            <path d="M9 12h6" />
            <path d="M9 16h6" />
          </svg>
          <h2 class="text-sm font-bold text-slate-800">Solicitudes pendientes</h2>
        </header>
        <div class="mt-2 flex items-baseline gap-2"><strong id="admin-pending-organizers-count" class="text-2xl font-extrabold">${formatCount(totalPendingOrganizers)}</strong><span class="text-xs font-medium text-slate-500">Por revisar</span></div>
        <button type="button" data-show-organizer-requests="true" class="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-lg p-1 text-xs font-bold text-orange-700 transition hover:bg-orange-200">
          Ver solicitudes <span aria-hidden="true">&rarr;</span>
        </button>
      </article>
    </section>
  `;
}

export function renderAdminDashboardMetricCardsEvents() {
  const showAllUsersButton = document.querySelector("[data-show-all-users='true']");
  const showAllEventsButton = document.querySelector("[data-show-all-events='true']");
  const showAllPlacesButton = document.querySelector("[data-show-all-places='true']");
  const showAllReviewsButton = document.querySelector("[data-show-all-reviews='true']");
  const showOrganizerRequestsButton = document.querySelector("[data-show-organizer-requests='true']");

  if (showOrganizerRequestsButton) {
    showOrganizerRequestsButton.addEventListener("click", () => {
      document.querySelector("[data-admin-sidebar-requests='true']")?.click();
    });
  }

  if (showAllUsersButton) {
    showAllUsersButton.addEventListener("click", async () => {
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllUsers();
      renderAdminDashboardAllUsersEvents();
    });
  }

  if (showAllEventsButton) {
    showAllEventsButton.addEventListener("click", async () => {
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllEvents();
      renderAdminDashboardAllEventsEvents();
    });
  }

  if (showAllPlacesButton) {
    showAllPlacesButton.addEventListener("click", async () => {
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllPlaces();
      renderAdminDashboardAllPlacesEvents();
    });
  }

  if (!showAllReviewsButton) {
    return;
  }

  showAllReviewsButton.addEventListener("click", async () => {
    const dashboardContent = document.getElementById("admin-dashboard-content");

    if (!dashboardContent) {
      return;
    }

    dashboardContent.innerHTML = await renderAdminDashboardAllReviews();
    renderAdminDashboardAllReviewsEvents();
    renderAdminDashboardBackEvent();
  });
}
