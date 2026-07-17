import { renderAdminDashboardPendingRequests } from "./adminDashboardPendingRequests.js";

export async function renderAdminDashboardAllOrganizerRequests() {
  const pendingRequests = await renderAdminDashboardPendingRequests();

  return `
    <header class="mb-4 border-b border-slate-200 pb-4">
      <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Solicitudes de organizador</h1>
      <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">
        Solicitudes pendientes por revisar
      </p>
    </header>

    <section class="min-h-0 flex-1 overflow-y-auto">
      ${pendingRequests}
    </section>
  `;
}
