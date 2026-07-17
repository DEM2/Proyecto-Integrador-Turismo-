import { getAdminDashboardOrganizerRequests } from "../../services/adminDashboard.service.js";
import {
  renderAdminDashboardPendingRequestsEvents,
  renderPendingRequestItems,
} from "./adminDashboardPendingRequests.js";

export async function renderAdminDashboardAllOrganizerRequests() {
  let pendingRequests = [];

  try {
    pendingRequests = await getAdminDashboardOrganizerRequests();
  } catch (error) {
    return `
      <header class="mb-4 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Solicitudes de organizador</h1>
        <p class="mt-1 text-base font-medium text-red-600 lg:text-sm">
          No se pudieron cargar las solicitudes.
        </p>
      </header>
    `;
  }

  return `
    <header class="mb-4 border-b border-slate-200 pb-4">
      <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Solicitudes de organizador</h1>
      <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">
        Solicitudes pendientes por revisar
      </p>
    </header>

    <section class="min-h-0 flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <ul data-pending-organizers-list="true" class="space-y-3">
        ${renderPendingRequestItems(pendingRequests)}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardAllOrganizerRequestsEvents() {
  renderAdminDashboardPendingRequestsEvents();
}
