import {
  getAdminDashboardAllPlaces,
  updateAdminDashboardPlace,
} from "../../services/adminDashboard.service.js";
import { openAdminDashboardCreatePlaceModal } from "./adminDashboardCreatePlaceModal.js";
import { renderAdminDashboardPlaceItem } from "./adminDashboardPlaceItem.js";

export async function renderAdminDashboardAllPlaces() {
  let places = [];

  try {
    places = await getAdminDashboardAllPlaces();
  } catch (error) {
    return `
      <header class="mb-4 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Sitios</h1>
        <p class="mt-1 text-base font-medium text-red-600 lg:text-sm">
          No se pudieron cargar los sitios.
        </p>
      </header>
    `;
  }

  let placeItems = "";

  if (places.length > 0) {
    placeItems = places.map((place) => renderAdminDashboardPlaceItem(place)).join("");
  } else {
    placeItems = `
      <li class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
        No hay sitios para mostrar.
      </li>
    `;
  }

  return `
    <header class="mb-4 flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Sitios</h1>
        <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">
          Todos los sitios registrados en la pagina
        </p>
      </div>

      <button
        type="button"
        data-create-place-modal="true"
        class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        Crear sitio
      </button>
    </header>

    <section class="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-5" aria-label="Filtros de sitios">
      <label class="text-sm font-bold text-slate-700">
        Sitio
        <input id="filter-place-name" type="search" placeholder="Nombre" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Categoria
        <input id="filter-place-category" type="search" placeholder="Categoria" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Organizador
        <input id="filter-place-user" type="search" placeholder="Nombre" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Estado
        <select id="filter-place-active" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="">Todos</option>
          <option value="true">Visibles</option>
          <option value="false">Ocultos</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700">
        Destacado
        <select id="filter-place-featured" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="">Todos</option>
          <option value="true">Destacados</option>
          <option value="false">No destacados</option>
        </select>
      </label>
    </section>

    <section id="admin-all-places" class="min-h-0 flex-1 overflow-y-auto" aria-labelledby="admin-all-places-title">
      <h2 id="admin-all-places-title" class="sr-only">Todos los sitios</h2>
      <ul class="space-y-3">
        ${placeItems}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardAllPlacesEvents() {
  const placesSection = document.getElementById("admin-all-places");
  const filterPlaceName = document.getElementById("filter-place-name");
  const filterPlaceCategory = document.getElementById("filter-place-category");
  const filterPlaceUser = document.getElementById("filter-place-user");
  const filterPlaceActive = document.getElementById("filter-place-active");
  const filterPlaceFeatured = document.getElementById("filter-place-featured");
  const createPlaceButton = document.querySelector("[data-create-place-modal='true']");

  if (!placesSection) {
    return;
  }

  function filterPlaces() {
    const nameValue = filterPlaceName.value.trim().toLowerCase();
    const categoryValue = filterPlaceCategory.value.trim().toLowerCase();
    const userValue = filterPlaceUser.value.trim().toLowerCase();
    const activeValue = filterPlaceActive.value;
    const featuredValue = filterPlaceFeatured.value;
    const placeItems = placesSection.querySelectorAll("[data-admin-place-item='true']");

    placeItems.forEach((placeItem) => {
      const placeName = placeItem.dataset.placeName || "";
      const placeCategory = placeItem.dataset.placeCategory || "";
      const placeUser = placeItem.dataset.placeUser || "";
      const placeActive = placeItem.dataset.placeActive || "";
      const placeFeatured = placeItem.dataset.placeFeatured || "";

      const matchName = !nameValue || placeName.includes(nameValue);
      const matchCategory = !categoryValue || placeCategory.includes(categoryValue);
      const matchUser = !userValue || placeUser.includes(userValue);
      const matchActive = !activeValue || placeActive === activeValue;
      const matchFeatured = !featuredValue || placeFeatured === featuredValue;

      if (matchName && matchCategory && matchUser && matchActive && matchFeatured) {
        placeItem.classList.remove("hidden");
      } else {
        placeItem.classList.add("hidden");
      }
    });
  }

  filterPlaceName.addEventListener("input", filterPlaces);
  filterPlaceCategory.addEventListener("input", filterPlaces);
  filterPlaceUser.addEventListener("input", filterPlaces);
  filterPlaceActive.addEventListener("change", filterPlaces);
  filterPlaceFeatured.addEventListener("change", filterPlaces);

  if (createPlaceButton) {
    createPlaceButton.addEventListener("click", () => {
      openAdminDashboardCreatePlaceModal(async () => {
        const dashboardContent = document.getElementById("admin-dashboard-content");

        if (!dashboardContent) {
          return;
        }

        dashboardContent.innerHTML = await renderAdminDashboardAllPlaces();
        renderAdminDashboardAllPlacesEvents();
      });
    });
  }

  placesSection.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-place='true']");
    const cancelButton = event.target.closest("[data-cancel-place-edit='true']");

    if (editButton) {
      const placeItem = editButton.closest("[data-admin-place-item='true']");

      if (!placeItem) {
        return;
      }

      const currentForm = placeItem.querySelector("[data-place-edit-form='true']");

      if (currentForm) {
        currentForm.remove();
        return;
      }

      placeItem.insertAdjacentHTML("beforeend", renderAdminDashboardPlaceEditForm(placeItem));
    }

    if (cancelButton) {
      const form = cancelButton.closest("[data-place-edit-form='true']");

      if (form) {
        form.remove();
      }
    }
  });

  placesSection.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-place-edit-form='true']");

    if (!form) {
      return;
    }

    event.preventDefault();

    const placeItem = form.closest("[data-admin-place-item='true']");

    if (!placeItem) {
      return;
    }

    const saveButton = form.querySelector("[data-save-place-edit='true']");
    const placeId = placeItem.dataset.placeId;
    const fields = form.elements;

    const placeData = {
      name: fields.name.value.trim(),
      description: fields.description.value.trim(),
      address: fields.address.value.trim(),
      is_featured: fields.is_featured.value === "true",
      is_active: fields.is_active.value === "true",
    };

    try {
      saveButton.disabled = true;
      saveButton.textContent = "Guardando...";

      await updateAdminDashboardPlace(placeId, placeData);

      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllPlaces();
      renderAdminDashboardAllPlacesEvents();
    } catch (error) {
      saveButton.disabled = false;
      saveButton.textContent = "Guardar cambios";
      alert("No se pudo actualizar el sitio. Intenta de nuevo.");
    }
  });
}

function renderAdminDashboardPlaceEditForm(placeItem) {
  return `
    <form data-place-edit-form="true" class="mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2 xl:grid-cols-4">
      <label class="text-sm font-bold text-slate-700">
        Nombre
        <input name="name" type="text" value="${placeItem.dataset.placeTitle || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700 md:col-span-2">
        Direccion
        <input name="address" type="text" value="${placeItem.dataset.placeAddress || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Categoria
        <input type="text" value="${placeItem.dataset.placeCategoryTitle || ""}" disabled class="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Organizador
        <input type="text" value="${placeItem.dataset.placeUserTitle || ""}" disabled class="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Estado
        <select name="is_active" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="true" ${placeItem.dataset.placeActive === "true" ? "selected" : ""}>Visible</option>
          <option value="false" ${placeItem.dataset.placeActive === "false" ? "selected" : ""}>Oculto</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700">
        Destacado
        <select name="is_featured" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="true" ${placeItem.dataset.placeFeatured === "true" ? "selected" : ""}>Destacado</option>
          <option value="false" ${placeItem.dataset.placeFeatured === "false" ? "selected" : ""}>No destacado</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700 md:col-span-2 xl:col-span-4">
        Descripcion
        <textarea name="description" rows="3" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">${placeItem.dataset.placeDescription || ""}</textarea>
      </label>

      <div class="flex gap-2 md:col-span-2 xl:col-span-4">
        <button type="submit" data-save-place-edit="true" class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
          Guardar cambios
        </button>
        <button type="button" data-cancel-place-edit="true" class="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
          Cancelar
        </button>
      </div>
    </form>
  `;
}
