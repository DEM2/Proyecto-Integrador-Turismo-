export function renderAdminDashboardPlaceItem(place) {
  function formatAttribute(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  }

  const placeId = place.id || "";
  const placeName = place.place_name || "Sitio";
  const categoryName = place.category_name || "Sin categoria";
  const userName = place.user_name || "Organizador";
  const address = place.address || "Sin direccion";
  const description = place.description || "Sin descripcion";
  const isFeatured = place.is_featured === true;
  const isActive = place.is_active !== false;

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

  return `
    <li
      class="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
      data-admin-place-item="true"
      data-place-id="${placeId}"
      data-place-name="${placeName.toLowerCase()}"
      data-place-title="${formatAttribute(placeName)}"
      data-place-category="${categoryName.toLowerCase()}"
      data-place-category-title="${formatAttribute(categoryName)}"
      data-place-user="${userName.toLowerCase()}"
      data-place-user-title="${formatAttribute(userName)}"
      data-place-featured="${isFeatured}"
      data-place-active="${isActive}"
      data-place-description="${formatAttribute(description)}"
      data-place-address="${formatAttribute(address)}"
    >
      <article>
        <div class="flex flex-wrap gap-2">
          ${activeLabel}
          ${featuredLabel}
          <span class="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            ${categoryName}
          </span>
        </div>
        <h3 class="mt-3 font-extrabold text-slate-800 lg:text-sm">
          ${placeName}
        </h3>
        <p class="mt-1 text-sm font-medium text-slate-600">
          ${address}
        </p>
        <p class="mt-1 line-clamp-2 text-sm font-medium text-slate-500">
          ${description}
        </p>
        <p class="mt-2 text-xs font-semibold text-slate-400">
          Organizador: ${userName}
        </p>
        <button
          type="button"
          data-edit-place="true"
          class="mt-3 cursor-pointer rounded-lg border border-blue-200 px-3 py-1 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
        >
          Editar
        </button>
      </article>
    </li>
  `;
}
