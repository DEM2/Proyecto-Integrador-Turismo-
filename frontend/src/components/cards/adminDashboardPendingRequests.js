function renderPendingRequestItem(request) {
  const fullName = [request.name, request.last_name].filter(Boolean).join(" ");
  const requestedAt = request.requested_at ?? "Sin fecha";

  return `
    <li class="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
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
        <button type="button" class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 lg:py-1.5">
          <span aria-hidden="true">&#10003;</span> Aprobar
        </button>
        <button type="button" class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 lg:py-1.5">
          <span aria-hidden="true">&#10005;</span> Rechazar
        </button>
      </div>
    </li>
  `;
}

export function renderAdminDashboardPendingRequests(pendingRequests = []) {
  const requestItems = pendingRequests.length
    ? pendingRequests.map((request) => renderPendingRequestItem(request)).join("")
    : `<li class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-semibold text-slate-500">No hay solicitudes pendientes.</li>`;

  return `
    <section aria-labelledby="pending-organizers-title" class="rounded-xl border border-slate-200 bg-white shadow-sm">
      <header class="flex items-center justify-between px-5 py-3">
        <h2 id="pending-organizers-title" class="text-xl font-extrabold lg:text-base">Solicitudes de organizador pendientes</h2>
        <a href="#" class="cursor-pointer text-sm font-bold text-blue-600 transition hover:text-blue-700 hover:underline">Ver todas</a>
      </header>

      <ul class="space-y-3 px-4 pb-4">
        ${requestItems}
      </ul>
    </section>
  `;
}
