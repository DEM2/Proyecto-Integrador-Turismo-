import {
  getAdminDashboardAllEvents,
  updateAdminDashboardEvent,
} from "../../services/adminDashboard.service.js";
import { renderAdminDashboardEventItem } from "./adminDashboardEventItem.js";
import { alertaError } from "../../utils/alerts.js";

export async function renderAdminDashboardAllEvents() {
  let events = [];

  try {
    events = await getAdminDashboardAllEvents();
  } catch (error) {
    return `
      <header class="mb-4 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Eventos</h1>
        <p class="mt-1 text-base font-medium text-red-600 lg:text-sm">
          No se pudieron cargar los eventos.
        </p>
      </header>
    `;
  }

  let eventItems = "";

  if (events.length > 0) {
    eventItems = events.map((event) => renderAdminDashboardEventItem(event)).join("");
  } else {
    eventItems = `
      <li class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
        No hay eventos para mostrar.
      </li>
    `;
  }

  return `
    <header class="mb-4 border-b border-slate-200 pb-4">
      <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Eventos</h1>
      <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">
        Todos los eventos registrados en la pagina
      </p>
    </header>

    <details class="mb-4 rounded-xl border border-slate-200 bg-white shadow-sm" aria-label="Filtros de eventos">
      <summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50">
        <span>Filtros de eventos</span>
        <span aria-hidden="true" class="text-blue-600">+</span>
      </summary>

      <section class="grid gap-3 border-t border-slate-200 p-4 sm:grid-cols-2 xl:grid-cols-4">
        <label class="text-sm font-bold text-slate-700">
          Evento
          <input id="filter-event-name" type="search" placeholder="Nombre" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
        </label>

        <label class="text-sm font-bold text-slate-700">
          Categoria
          <input id="filter-event-category" type="search" placeholder="Categoria" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
        </label>

        <label class="text-sm font-bold text-slate-700">
          Organizador
          <input id="filter-event-user" type="search" placeholder="Nombre" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
        </label>

        <label class="text-sm font-bold text-slate-700">
          Estado
          <select id="filter-event-active" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
            <option value="">Todos</option>
            <option value="true">Visibles</option>
            <option value="false">Ocultos</option>
          </select>
        </label>

        <label class="text-sm font-bold text-slate-700">
          Destacado
          <select id="filter-event-featured" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
            <option value="">Todos</option>
            <option value="true">Destacados</option>
            <option value="false">No destacados</option>
          </select>
        </label>

        <label class="text-sm font-bold text-slate-700">
          Fecha inicio
          <input id="filter-event-start-date" type="date" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
        </label>

        <label class="text-sm font-bold text-slate-700">
          Fecha creacion
          <input id="filter-event-created" type="date" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
        </label>

        <label class="text-sm font-bold text-slate-700">
          Fecha actualizacion
          <input id="filter-event-updated" type="date" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
        </label>
      </section>
    </details>

    <section id="admin-all-events" class="min-h-0 flex-1 overflow-y-auto" aria-labelledby="admin-all-events-title">
      <h2 id="admin-all-events-title" class="sr-only">Todos los eventos</h2>
      <ul class="space-y-3">
        ${eventItems}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardAllEventsEvents() {
  const eventsSection = document.getElementById("admin-all-events");
  const filterEventName = document.getElementById("filter-event-name");
  const filterEventCategory = document.getElementById("filter-event-category");
  const filterEventUser = document.getElementById("filter-event-user");
  const filterEventActive = document.getElementById("filter-event-active");
  const filterEventFeatured = document.getElementById("filter-event-featured");
  const filterEventStartDate = document.getElementById("filter-event-start-date");
  const filterEventCreated = document.getElementById("filter-event-created");
  const filterEventUpdated = document.getElementById("filter-event-updated");

  if (!eventsSection) {
    return;
  }

  function filterEvents() {
    const nameValue = filterEventName.value.trim().toLowerCase();
    const categoryValue = filterEventCategory.value.trim().toLowerCase();
    const userValue = filterEventUser.value.trim().toLowerCase();
    const activeValue = filterEventActive.value;
    const featuredValue = filterEventFeatured.value;
    const startDateValue = filterEventStartDate.value;
    const createdValue = filterEventCreated.value;
    const updatedValue = filterEventUpdated.value;
    const eventItems = eventsSection.querySelectorAll("[data-admin-event-item='true']");

    eventItems.forEach((eventItem) => {
      const eventName = eventItem.dataset.eventName || "";
      const eventCategory = eventItem.dataset.eventCategory || "";
      const eventUser = eventItem.dataset.eventUser || "";
      const eventActive = eventItem.dataset.eventActive || "";
      const eventFeatured = eventItem.dataset.eventFeatured || "";
      const eventStartDate = eventItem.dataset.eventStartDate || "";
      const eventCreated = eventItem.dataset.eventCreated || "";
      const eventUpdated = eventItem.dataset.eventUpdated || "";

      const matchName = !nameValue || eventName.includes(nameValue);
      const matchCategory = !categoryValue || eventCategory.includes(categoryValue);
      const matchUser = !userValue || eventUser.includes(userValue);
      const matchActive = !activeValue || eventActive === activeValue;
      const matchFeatured = !featuredValue || eventFeatured === featuredValue;
      const matchStartDate = !startDateValue || eventStartDate === startDateValue;
      const matchCreated = !createdValue || eventCreated === createdValue;
      const matchUpdated = !updatedValue || eventUpdated === updatedValue;

      if (matchName && matchCategory && matchUser && matchActive && matchFeatured && matchStartDate && matchCreated && matchUpdated) {
        eventItem.classList.remove("hidden");
      } else {
        eventItem.classList.add("hidden");
      }
    });
  }

  filterEventName.addEventListener("input", filterEvents);
  filterEventCategory.addEventListener("input", filterEvents);
  filterEventUser.addEventListener("input", filterEvents);
  filterEventActive.addEventListener("change", filterEvents);
  filterEventFeatured.addEventListener("change", filterEvents);
  filterEventStartDate.addEventListener("change", filterEvents);
  filterEventCreated.addEventListener("change", filterEvents);
  filterEventUpdated.addEventListener("change", filterEvents);

  eventsSection.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-event='true']");
    const cancelButton = event.target.closest("[data-cancel-event-edit='true']");

    if (editButton) {
      const eventItem = editButton.closest("[data-admin-event-item='true']");

      if (!eventItem) {
        return;
      }

      const currentForm = eventItem.querySelector("[data-event-edit-form='true']");

      if (currentForm) {
        currentForm.remove();
        return;
      }

      eventItem.insertAdjacentHTML("beforeend", renderAdminDashboardEventEditForm(eventItem));
    }

    if (cancelButton) {
      const form = cancelButton.closest("[data-event-edit-form='true']");

      if (form) {
        form.remove();
      }
    }
  });

  eventsSection.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-event-edit-form='true']");

    if (!form) {
      return;
    }

    event.preventDefault();

    const eventItem = form.closest("[data-admin-event-item='true']");

    if (!eventItem) {
      return;
    }

    const saveButton = form.querySelector("[data-save-event-edit='true']");
    const eventId = eventItem.dataset.eventId;
    const fields = form.elements;

    const eventData = {
      name: fields.name.value.trim(),
      description: fields.description.value.trim(),
      start_date: fields.start_date.value || null,
      price: fields.price.value || null,
      address: fields.address.value.trim(),
      image_main: fields.image_main.value.trim(),
      is_featured: fields.is_featured.value === "true",
      is_active: fields.is_active.value === "true",
    };

    try {
      saveButton.disabled = true;
      saveButton.textContent = "Guardando...";

      await updateAdminDashboardEvent(eventId, eventData);

      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllEvents();
      renderAdminDashboardAllEventsEvents();
    } catch (error) {
      saveButton.disabled = false;
      saveButton.textContent = "Guardar cambios";
      alertaError("No se pudo actualizar el evento. Intenta de nuevo.");
    }
  });
}

function renderAdminDashboardEventEditForm(eventItem) {
  return `
    <form data-event-edit-form="true" class="col-span-full mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2 xl:grid-cols-4">
      <label class="text-sm font-bold text-slate-700">
        Nombre
        <input name="name" type="text" value="${eventItem.dataset.eventTitle || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Fecha inicio
        <input name="start_date" type="date" value="${eventItem.dataset.eventStartDate || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Precio
        <input name="price" type="number" value="${eventItem.dataset.eventPrice || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Categoria
        <input type="text" value="${eventItem.dataset.eventCategoryTitle || ""}" disabled class="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Organizador
        <input type="text" value="${eventItem.dataset.eventUserTitle || ""}" disabled class="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Imagen
        <input name="image_main" type="text" value="${eventItem.dataset.eventImageMain || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700 md:col-span-2">
        Direccion
        <input name="address" type="text" value="${eventItem.dataset.eventAddress || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Estado
        <select name="is_active" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="true" ${eventItem.dataset.eventActive === "true" ? "selected" : ""}>Visible</option>
          <option value="false" ${eventItem.dataset.eventActive === "false" ? "selected" : ""}>Oculto</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700">
        Destacado
        <select name="is_featured" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="true" ${eventItem.dataset.eventFeatured === "true" ? "selected" : ""}>Destacado</option>
          <option value="false" ${eventItem.dataset.eventFeatured === "false" ? "selected" : ""}>No destacado</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700 md:col-span-2 xl:col-span-4">
        Descripcion
        <textarea name="description" rows="3" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">${eventItem.dataset.eventDescription || ""}</textarea>
      </label>

      <div class="flex gap-2 md:col-span-2 xl:col-span-4">
        <button type="submit" data-save-event-edit="true" class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
          Guardar cambios
        </button>
        <button type="button" data-cancel-event-edit="true" class="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
          Cancelar
        </button>
      </div>
    </form>
  `;
}
