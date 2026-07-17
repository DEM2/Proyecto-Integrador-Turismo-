export function renderAdminDashboardEventItem(event) {
  const eventName = event.event_name || "Evento";
  const categoryName = event.category_name || "Sin categoria";
  const userName = event.user_name || "Organizador";
  const address = event.address || "Sin direccion";
  const startDate = event.start_date || "";
  const createdAt = event.created_at || "";
  const updatedAt = event.updated_at || "";
  const price = event.price ?? null;
  const isFeatured = event.is_featured === true;
  const isActive = event.is_active !== false;
  let priceLabel = "Sin precio";

  let featuredLabel = "";
  let activeLabel = "";

  if (isFeatured) {
    featuredLabel = `
      <span class="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
        Destacado
      </span>
    `;
  }

  if (!isFeatured) {
    featuredLabel = `
      <span class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
        No destacado
      </span>
    `;
  }

  if (isActive) {
    activeLabel = `
      <span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
        Visible
      </span>
    `;
  }

  if (!isActive) {
    activeLabel = `
      <span class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
        Oculto
      </span>
    `;
  }

  if (price !== null) {
    priceLabel = `$${price}`;
  }

  return `
    <li
      class="grid gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:grid-cols-[1fr_auto]"
      data-admin-event-item="true"
      data-event-name="${eventName.toLowerCase()}"
      data-event-category="${categoryName.toLowerCase()}"
      data-event-user="${userName.toLowerCase()}"
      data-event-featured="${isFeatured}"
      data-event-active="${isActive}"
      data-event-start-date="${startDate}"
      data-event-created="${createdAt}"
      data-event-updated="${updatedAt}"
    >
      <article>
        <div class="flex flex-wrap gap-2">
          ${activeLabel}
          ${featuredLabel}
          <span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            ${categoryName}
          </span>
        </div>
        <h3 class="mt-3 font-extrabold text-slate-800 lg:text-sm">
          ${eventName}
        </h3>
        <p class="mt-1 text-sm font-medium text-slate-600">
          ${address}
        </p>
        <p class="mt-1 text-xs font-semibold text-slate-400">
          Organizador: ${userName}
        </p>
      </article>

      <div class="text-left lg:text-right">
        <p class="text-sm font-bold text-slate-700">Inicio: ${startDate || "Sin fecha"}</p>
        <p class="mt-1 text-sm font-medium text-slate-500">Creado: ${createdAt || "Sin fecha"}</p>
        <p class="mt-1 text-sm font-medium text-slate-500">Actualizado: ${updatedAt || "Sin fecha"}</p>
        <p class="mt-2 text-sm font-extrabold text-emerald-600">${priceLabel}</p>
      </div>
    </li>
  `;
}
