import {
  approveAdminDashboardOrganizer,
  getAdminDashboardData,
  rejectAdminDashboardOrganizer,
} from "../../services/adminDashboard.service.js";
import { alertaConfirmacion, alertaError, alertaExitosa } from "../../utils/alertsss.js";

export function renderPendingRequestItem(request) {
  const fullName = [request.name, request.last_name].filter(Boolean).join(" ");
  const requestedAt = request.requested_at ?? "Sin fecha";

  return `
    <li data-pending-organizer-item="true" data-organizer-id="${request.id}" class="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
      <article class="flex items-center gap-3">
        <img src="/images/login-hero.png" alt="" class="size-14 rounded-full object-cover" />
        <h3 class="sr-only">Solicitud de ${fullName}</h3>
        <p class="text-sm font-semibold text-slate-500">
          <span class="block text-base font-extrabold text-slate-800 lg:text-sm">${fullName}</span>
          ${request.email}
          <span class="block pt-1">Solicitado el ${requestedAt}</span>
        </p>
      </article>
      <div class="flex gap-3">
        <button type="button" data-approve-organizer="true" class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 lg:py-1.5">
          <span aria-hidden="true">&#10003;</span> Aprobar
        </button>
        <button type="button" data-reject-organizer="true" class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 lg:py-1.5">
          <span aria-hidden="true">&#10005;</span> Rechazar
        </button>
      </div>
    </li>
  `;
}

export function renderPendingRequestItems(pendingRequests) {
  return pendingRequests.length
    ? pendingRequests.map((request) => renderPendingRequestItem(request)).join("")
    : renderNoPendingRequests();
}

function renderNoPendingRequests() {
  return `<li data-no-pending-organizers="true" class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-semibold text-slate-500">No hay solicitudes pendientes.</li>`;
}

export async function renderAdminDashboardPendingRequests() {
  let pendingRequests = [];

  try {
    const dashboardData = await getAdminDashboardData();
    pendingRequests = dashboardData.pendingOrganizers ?? pendingRequests;
  } catch (error) {
    console.error(error);
  }

  return `
    <section aria-labelledby="pending-organizers-title" class="min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <header class="flex items-center justify-between px-5 py-3">
        <h2 id="pending-organizers-title" class="text-xl font-extrabold lg:text-base">Solicitudes de organizador pendientes</h2>
        <button type="button" data-show-all-organizer-requests="true" class="cursor-pointer text-sm font-bold text-blue-600 transition hover:text-blue-700 hover:underline">Ver todas</button>
      </header>

      <ul data-pending-organizers-list="true" class="space-y-3 px-4 pb-4">
        ${renderPendingRequestItems(pendingRequests)}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardPendingRequestsEvents() {
  const pendingRequestsList = document.querySelector("[data-pending-organizers-list='true']");
  const showAllButton = document.querySelector("[data-show-all-organizer-requests='true']");

  if (showAllButton) {
    showAllButton.addEventListener("click", () => {
      document.querySelector("[data-admin-sidebar-requests='true']")?.click();
    });
  }

  if (!pendingRequestsList) {
    return;
  }

  pendingRequestsList.addEventListener("click", async (event) => {
    const approveButton = event.target.closest("[data-approve-organizer='true']");
    const rejectButton = event.target.closest("[data-reject-organizer='true']");

    if (!approveButton && !rejectButton) {
      return;
    }

    const requestItem = event.target.closest("[data-pending-organizer-item='true']");

    if (!requestItem) {
      return;
    }

    if (rejectButton) {
      const confirmed = await alertaConfirmacion(
        "¿Rechazar solicitud?",
        "La solicitud y la cuenta del organizador se eliminaran."
      );

      if (!confirmed) {
        return;
      }
    }

    const actionButtons = requestItem.querySelectorAll("button");
    actionButtons.forEach((button) => button.disabled = true);

    try {
      if (approveButton) {
        approveButton.textContent = "Aprobando...";
        await approveAdminDashboardOrganizer(requestItem.dataset.organizerId);
        alertaExitosa("Solicitud aprobada exitosamente");
      } else {
        rejectButton.textContent = "Eliminando...";
        await rejectAdminDashboardOrganizer(requestItem.dataset.organizerId);
        alertaExitosa("Solicitud y cuenta eliminadas exitosamente");
      }

      requestItem.remove();
      decreasePendingOrganizersCount();

      if (!pendingRequestsList.querySelector("[data-pending-organizer-item='true']")) {
        pendingRequestsList.innerHTML = renderNoPendingRequests();
      }
    } catch (error) {
      actionButtons.forEach((button) => button.disabled = false);
      if (approveButton) {
        approveButton.innerHTML = '<span aria-hidden="true">&#10003;</span> Aprobar';
      } else {
        rejectButton.innerHTML = '<span aria-hidden="true">&#10005;</span> Rechazar';
      }
      alertaError(error.message);
    }
  });
}

function decreasePendingOrganizersCount() {
  const countElement = document.getElementById("admin-pending-organizers-count");

  if (!countElement) {
    return;
  }

  const currentCount = Number(countElement.textContent) || 0;
  countElement.textContent = Math.max(0, currentCount - 1);
}
