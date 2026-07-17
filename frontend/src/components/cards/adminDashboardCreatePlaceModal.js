import { getSession } from "../../services/authService.js";
import { postPlace } from "../../services/destinationService.js";

export function openAdminDashboardCreatePlaceModal(onCreated) {
  const currentModal = document.getElementById("admin-create-place-modal");

  if (currentModal) {
    currentModal.remove();
  }

  document.body.insertAdjacentHTML("beforeend", renderAdminDashboardCreatePlaceModal());
  renderAdminDashboardCreatePlaceModalEvents(onCreated);
}

function renderAdminDashboardCreatePlaceModal() {
  return `
    <section
      id="admin-create-place-modal"
      class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/55 px-4 py-5 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-create-place-title"
    >
      <article class="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/30">
        <header class="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p class="text-xs font-black uppercase tracking-wide text-blue-600">
              Gestion de sitios
            </p>
            <h2 id="admin-create-place-title" class="mt-1 text-2xl font-extrabold text-slate-950">
              Crear sitio
            </h2>
            <p class="mt-1 text-sm font-medium text-slate-500">
              Completa los datos principales para publicar un nuevo sitio turistico.
            </p>
          </div>

          <button
            type="button"
            data-close-create-place-modal="true"
            class="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Cerrar
          </button>
        </header>

        <form id="admin-create-place-form" class="flex flex-1 flex-col overflow-hidden">
          <section class="grid flex-1 gap-5 overflow-y-auto bg-slate-50/60 p-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <fieldset class="grid content-start gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-2">
              <legend class="px-2 text-sm font-black uppercase tracking-wide text-slate-500">
                Informacion del sitio
              </legend>

              <label class="text-sm font-bold text-slate-700 md:col-span-2">
                Nombre del lugar
                <input
                  id="admin-place-name"
                  name="name"
                  type="text"
                  maxlength="150"
                  required
                  placeholder="Ejemplo: Museo del Carnaval"
                  class="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label class="text-sm font-bold text-slate-700">
                Categoria
                <select
                  id="admin-place-category"
                  name="id_category"
                  required
                  class="mt-2 h-11 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Selecciona una categoria</option>
                  <option value="1">Cultura</option>
                  <option value="2">Historia</option>
                  <option value="3">Gastronomia</option>
                  <option value="4">Naturaleza</option>
                  <option value="5">Entretenimiento</option>
                  <option value="6">Restaurante</option>
                  <option value="7">Museo</option>
                  <option value="8">Aire libre</option>
                </select>
              </label>

              <label class="text-sm font-bold text-slate-700">
                Estado inicial
                <select
                  id="admin-place-status"
                  name="is_active"
                  class="mt-2 h-11 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </label>

              <label class="text-sm font-bold text-slate-700 md:col-span-2">
                Descripcion
                <textarea
                  id="admin-place-description"
                  name="description"
                  rows="6"
                  placeholder="Describe que hace especial este sitio."
                  class="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                ></textarea>
              </label>

              <label class="text-sm font-bold text-slate-700 md:col-span-2">
                Ubicacion
                <input
                  id="admin-place-address"
                  name="address"
                  type="text"
                  maxlength="250"
                  required
                  placeholder="Ejemplo: Carrera 54 # 49B-39, Barranquilla"
                  class="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </fieldset>

            <aside class="flex flex-col rounded-xl border border-slate-200 bg-white p-5">
              <p class="text-xs font-black uppercase tracking-wide text-blue-600">
                Vista previa
              </p>
              <h3 id="admin-place-preview-name" class="mt-3 text-xl font-extrabold text-slate-950">
                Nombre del sitio
              </h3>
              <p id="admin-place-preview-description" class="mt-3 line-clamp-7 text-sm font-medium leading-6 text-slate-500">
                La descripcion del sitio aparecera aqui.
              </p>

              <div class="mt-auto space-y-3 border-t border-slate-100 pt-4">
                <p id="admin-place-preview-address" class="text-sm font-bold text-blue-600">
                  Ubicacion por definir
                </p>
                <p id="admin-place-preview-status" class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  Sitio activo
                </p>
              </div>
            </aside>
          </section>

          <footer class="flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
            <button
              type="button"
              data-close-create-place-modal="true"
              class="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              data-save-create-place="true"
              class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Crear sitio
            </button>
          </footer>
        </form>
      </article>
    </section>
  `;
}

function renderAdminDashboardCreatePlaceModalEvents(onCreated) {
  const modal = document.getElementById("admin-create-place-modal");
  const form = document.getElementById("admin-create-place-form");

  if (!modal || !form) {
    return;
  }

  modal.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-create-place-modal='true']");

    if (closeButton || event.target === modal) {
      modal.remove();
    }
  });

  form.addEventListener("input", updateCreatePlacePreview);
  form.addEventListener("change", updateCreatePlacePreview);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const placeCreated = getAdminDashboardPlaceData();
    const validationResult = validateAdminDashboardPlaceForm(placeCreated);

    if (validationResult !== true) {
      alert(validationResult);
      return;
    }

    const saveButton = form.querySelector("[data-save-create-place='true']");

    try {
      saveButton.disabled = true;
      saveButton.textContent = "Creando...";

      await postPlace(placeCreated);

      modal.remove();

      if (typeof onCreated === "function") {
        await onCreated();
      }
    } catch (error) {
      saveButton.disabled = false;
      saveButton.textContent = "Crear sitio";
      alert(error.message || "No se pudo crear el sitio. Intenta de nuevo.");
    }
  });
}

function getAdminDashboardPlaceData() {
  const name = document.getElementById("admin-place-name");
  const idCategory = document.getElementById("admin-place-category");
  const isActive = document.getElementById("admin-place-status");
  const description = document.getElementById("admin-place-description");
  const address = document.getElementById("admin-place-address");
  const session = getSession();
  const idUser = session?.user?.id;

  return {
    name: name.value.trim(),
    id_category: Number(idCategory.value),
    is_active: isActive.value === "true",
    description: description.value.trim(),
    address: address.value.trim(),
    fk_places_user: idUser,
  };
}

function validateAdminDashboardPlaceForm(placeCreated) {
  if (!placeCreated.name) {
    return "El nombre del sitio es obligatorio";
  }

  if (placeCreated.name.length < 3 || placeCreated.name.length > 150) {
    return "El nombre debe tener entre 3 y 150 caracteres";
  }

  if (!placeCreated.id_category || placeCreated.id_category <= 0) {
    return "Selecciona una categoria";
  }

  if (!placeCreated.address) {
    return "La ubicacion es obligatoria";
  }

  if (placeCreated.address.length < 5 || placeCreated.address.length > 250) {
    return "La ubicacion debe tener entre 5 y 250 caracteres";
  }

  if (!placeCreated.fk_places_user) {
    return "No se encontro el usuario autenticado";
  }

  return true;
}

function updateCreatePlacePreview() {
  const placeCreated = getAdminDashboardPlaceData();
  const placeNamePreview = document.getElementById("admin-place-preview-name");
  const placeDescriptionPreview = document.getElementById("admin-place-preview-description");
  const placeAddressPreview = document.getElementById("admin-place-preview-address");
  const placeStatusPreview = document.getElementById("admin-place-preview-status");

  placeNamePreview.textContent = placeCreated.name || "Nombre del sitio";
  placeDescriptionPreview.textContent = placeCreated.description || "La descripcion del sitio aparecera aqui.";
  placeAddressPreview.textContent = placeCreated.address || "Ubicacion por definir";
  placeStatusPreview.textContent = placeCreated.is_active ? "Sitio activo" : "Sitio inactivo";
  placeStatusPreview.className = placeCreated.is_active
    ? "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700"
    : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500";
}
