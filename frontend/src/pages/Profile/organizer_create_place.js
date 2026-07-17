import { renderMainNavigation, initializeMainNavigationEvents } from "../../components/layout/MainNavigation.js";
import { navigateTo } from "../../router/AppRouter.js";
import { getSession } from "../../services/authService.js";
import { postPlace } from "../../services/destinationService.js";
import { alertaError, alertaExitosa } from "../../utils/alertsss.js";
import { renderProfileInfo, renderProfileInfoEvents } from "./renderprofileorganizador.js";

export function renderCreatePlaceView() {

  return `
    ${renderMainNavigation()}
    <main class="min-h-screen bg-gray-50 font-sans text-blue-950">
    ${renderProfileInfo()}

      <!-- =====================================================
           CONTENIDO DINÁMICO DEL ORGANIZADOR
      ====================================================== -->
      <section
        id="organizer-content"
        class="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6"
        aria-live="polite"
      >

        <section
          class="space-y-8"
          aria-labelledby="create-place-title"
        >

          <!-- ENCABEZADO DE CREACIÓN -->
          <header
            class="flex flex-wrap items-start justify-between gap-5 rounded-[26px] border border-purple-100 bg-gradient-to-r from-blue-950 via-purple-900 to-purple-700 px-6 py-7 text-white shadow-xl"
          >
            <section>
              <p
                class="text-xs font-black uppercase tracking-[0.18em] text-purple-200"
              >
                Panel del organizador
              </p>

              <h2
                id="create-place-title"
                class="mt-2 text-3xl font-black tracking-tight"
              >
                Crear lugar turístico
              </h2>

              <p
                class="mt-2 max-w-2xl text-sm leading-relaxed text-purple-100"
              >
                Registra un destino, restaurante, espacio cultural o sitio de
                interés para que los usuarios puedan descubrirlo en
                Barranquilla Explora.
              </p>
            </section>

            <button
              id="btn-back-organizer-profile"
              type="button"
              class="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-950"
            >
              ← Volver a mis sitios
            </button>
          </header>

          <!-- FORMULARIO -->
          <form
            id="create-place-form"
            class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]"
            novalidate
          >

            <!-- CAMPOS PRINCIPALES -->
            <section class="min-w-0 space-y-7">

              <!-- INFORMACIÓN GENERAL -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Información general
                </legend>

                <p class="mt-2 text-sm text-slate-500">
                  Indica el nombre, la categoría y la descripción del lugar.
                </p>

                <section
                  class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
                >

                  <!-- Nombre -->
                  <label class="md:col-span-2">
                    <span
                      class="mb-2 block text-sm font-bold text-blue-950"
                    >
                      Nombre del lugar
                    </span>

                    <input
                      id="place-name"
                      name="name"
                      type="text"
                      maxlength="150"
                      placeholder="Ejemplo: Museo del Carnaval"
                      autocomplete="off"
                      required
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    />

                    <small class="mt-2 block text-xs text-slate-400">
                      Máximo 150 caracteres.
                    </small>
                  </label>

                  <!-- Categoría -->
                  <label>
                    <span
                      class="mb-2 block text-sm font-bold text-blue-950"
                    >
                      Categoría
                    </span>

                    <select
                      id="place-category"
                      name="id_category"
                      required
                      class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    >
                      <option value="">
                        Selecciona una categoría
                      </option>

                      <option value="1">Cultura</option>
                      <option value="2">Historia</option>
                      <option value="3">Gastronomía</option>
                      <option value="4">Naturaleza</option>
                      <option value="5">Entretenimiento</option>
                      <option value="6">Restaurante</option>
                      <option value="7">Museo</option>
                      <option value="8">Aire libre</option>
                    </select>
                  </label>

                  <!-- Estado -->
                  <label>
                    <span
                      class="mb-2 block text-sm font-bold text-blue-950"
                    >
                      Estado inicial
                    </span>

                    <select
                      id="place-status"
                      name="is_active"
                      class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </label>

                  <!-- Descripción -->
                  <label class="md:col-span-2">
                    <span
                      class="mb-2 block text-sm font-bold text-blue-950"
                    >
                      Descripción
                    </span>

                    <textarea
                      id="place-description"
                      name="description"
                      rows="7"
                      placeholder="Describe la historia, características, atractivos y experiencias que ofrece el lugar."
                      class="w-full resize-none rounded-xl border border-slate-200 p-4 leading-relaxed text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    ></textarea>

                    <small class="mt-2 block text-xs text-slate-400">
                      Explica por qué este lugar debería ser visitado.
                    </small>
                  </label>

                </section>
              </fieldset>

              <!-- UBICACIÓN -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Ubicación
                </legend>

                <p class="mt-2 text-sm text-slate-500">
                  Escribe la dirección donde los visitantes podrán encontrar
                  el lugar.
                </p>

                <section class="mt-6">
                  <label>
                    <span
                      class="mb-2 block text-sm font-bold text-blue-950"
                    >
                      Dirección
                    </span>

                    <input
                      id="place-address"
                      name="address"
                      type="text"
                      maxlength="250"
                      placeholder="Ejemplo: Carrera 54 # 49B-39, Barranquilla"
                      autocomplete="street-address"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    />

                    <small class="mt-2 block text-xs text-slate-400">
                      Máximo 250 caracteres.
                    </small>
                  </label>
                </section>
                <button id="save-place-change"
                    type="button"
                    class="h-12 w-full rounded-xl bg-blue-950 font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
                  >
                    Guardar cambios
                  </button>
              </fieldset>

              <!-- INFORMACIÓN DE PUBLICACIÓN -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Información de publicación
                </legend>

                <section
                  class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >

                  <article
                    class="rounded-2xl border border-blue-100 bg-blue-50 p-5"
                  >
                    <p
                      class="text-xs font-black uppercase tracking-wider text-blue-600"
                    >
                      Propietario
                    </p>

                    <h3 class="mt-2 font-black text-blue-950">
                      Usuario autenticado
                    </h3>

                    <p
                      class="mt-2 text-sm leading-relaxed text-slate-600"
                    >
                      El sistema asociará automáticamente el lugar con tu
                      cuenta de organizador.
                    </p>
                  </article>

                  <article
                    class="rounded-2xl border border-purple-100 bg-purple-50 p-5"
                  >
                    <p
                      class="text-xs font-black uppercase tracking-wider text-purple-600"
                    >
                      Publicación
                    </p>

                    <h3 class="mt-2 font-black text-blue-950">
                      Estado controlado
                    </h3>

                    <p
                      class="mt-2 text-sm leading-relaxed text-slate-600"
                    >
                      Puedes publicar el lugar como activo o guardarlo
                      inicialmente como inactivo.
                    </p>
                  </article>

                </section>
              </fieldset>

              <!-- MENSAJES DEL FORMULARIO -->
              <p
                id="place-form-message"
                class="hidden rounded-xl border px-4 py-3 text-sm font-semibold"
                role="status"
                aria-live="polite"
              ></p>

            </section>

            <!-- PANEL LATERAL -->
            <aside class="min-w-0 space-y-5">

              <!-- VISTA PREVIA -->
              <article
                class="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-xl lg:sticky lg:top-24"
              >

                <header
                  class="bg-gradient-to-br from-blue-950 to-purple-700 px-6 py-6 text-white"
                >
                  <p
                    class="text-xs font-black uppercase tracking-[0.16em] text-purple-200"
                  >
                    Antes de publicar
                  </p>

                  <h2 class="mt-1 text-xl font-black">
                    Revisa tu lugar
                  </h2>
                </header>

                <section class="p-6">

                  <figure
                    class="relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100"
                  >
                    <img
                      src="/images/place-placeholder.jpg"
                      alt="Imagen representativa de un lugar turístico"
                      class="h-full w-full object-cover"
                    />

                    <figcaption
                      class="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-700 shadow-sm backdrop-blur-sm"
                    >
                      Lugar turístico
                    </figcaption>
                  </figure>

                  <h3
                    id="place-name-preview"
                    class="text-xl font-black text-blue-950"
                  >
                    Nombre del lugar
                  </h3>

                  <p
                    id="place-description-preview"
                    class="mt-4 line-clamp-4 text-sm leading-relaxed text-slate-500"
                  >
                    La descripción del lugar aparecerá en este espacio.
                  </p>

                  <ul
                    class="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600"
                  >
                    <li class="flex items-center gap-3">
                      <span
                        class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50"
                        aria-hidden="true"
                      >
                        📍
                      </span>

                      <span id="place-address-preview">
                        Dirección por definir
                      </span>
                    </li>

                    <li class="flex items-center gap-3">
                      <span
                        class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-50"
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span id="place-status-preview">
                        Lugar activo
                      </span>
                    </li>
                  </ul>

                </section>

                <footer class="space-y-3 border-t border-slate-100 p-6">
                  <button
                    type="submit"
                    class="h-12 w-full rounded-xl bg-purple-700 font-bold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800"
                  >
                    Publicar lugar
                  </button>

                  <button
                    id="cancel-place"
                    type="button"
                    class="h-12 w-full rounded-xl border border-purple-600 font-bold text-purple-600 transition hover:bg-purple-50"
                  >
                    Cancelar
                  </button>
                </footer>
              </article>

              <!-- RECOMENDACIONES -->
              <section
                class="rounded-2xl border border-yellow-200 bg-yellow-50 p-5"
                aria-labelledby="place-recommendations-title"
              >
                <h3
                  id="place-recommendations-title"
                  class="font-black text-yellow-800"
                >
                  Recomendaciones
                </h3>

                <ul
                  class="mt-3 space-y-2 text-sm leading-relaxed text-yellow-700"
                >
                  <li>• Utiliza el nombre oficial del lugar.</li>
                  <li>• Selecciona la categoría adecuada.</li>
                  <li>• Escribe una descripción clara y atractiva.</li>
                  <li>• Verifica que la dirección sea correcta.</li>
                </ul>
              </section>

            </aside>

          </form>

        </section>
      </section>

    </main>
  `;
}

export function renderCreatePlaceEvents() {
  initializeMainNavigationEvents();
  renderProfileInfoEvents();

  const formCreatePlace = document.getElementById("create-place-form");
  const savePlaceChangeButton = document.getElementById("save-place-change")
  const cancelPlaceButton = document.getElementById("cancel-place")
  const backOrganizerButton = document.getElementById("btn-back-organizer-profile")

  if (!formCreatePlace || !savePlaceChangeButton ) {
    return
  }

  if(backOrganizerButton){
    backOrganizerButton.addEventListener("click", function(){
      navigateTo("/perfilorganizador")
    })
  }

  if(cancelPlaceButton){
    cancelPlaceButton.addEventListener("click", function(){
      navigateTo("/perfilorganizador")
    })
  }

  savePlaceChangeButton.addEventListener("click", function(){
    const placeCreated = getPlaceData()

    const resultValidation = validatePlaceForm(placeCreated)

    if(resultValidation !== true){
      alert(resultValidation)
      return
    }

    updatePlacePreview(placeCreated);
  })



  formCreatePlace.addEventListener("submit", async function (event) {
    event.preventDefault();

    const placeCreated = getPlaceData()

    const validationResult = validatePlaceForm(placeCreated)

    if (validationResult !== true) {
      alertaError(validationResult)
      return
    }


    try {
      const result = await postPlace(placeCreated)

      alertaExitosa("Lugar publicado correctamente")
      formCreatePlace.reset()
      resetPlacePreview()
      //FUNCION PARA RETROCEDER
    } catch (error) {
      alertaError("No se pudo crear el lugar")
    }

    // Después puedes validar y enviar placeCreated al backend.
  });

}

function getPlaceData() {
  const name = document.getElementById("place-name");
  const idCategory = document.getElementById("place-category");
  const isActive = document.getElementById("place-status");
  const description = document.getElementById("place-description");
  const address = document.getElementById("place-address");

  // Obtener el ID del organizador que inició sesión
  const session = getSession();
  const idUser = session?.user?.id;

  return {
    name: name.value.trim(),//
    id_category: Number(idCategory.value),//
    is_active: isActive.value === "true",//
    description: description.value.trim(),//
    address: address.value.trim(),//
    id_user: idUser,
  };
}

function updatePlacePreview(placeCreated) {
  const {
    name,
    description,
    address,
    is_active
  } = placeCreated;

  const placeNamePreview = document.getElementById("place-name-preview");
  const placeDescriptionPreview = document.getElementById("place-description-preview");
  const placeAddressPreview = document.getElementById("place-address-preview");
  const placeStatusPreview = document.getElementById("place-status-preview");


  placeNamePreview.textContent = name
  placeDescriptionPreview.textContent = description
  placeAddressPreview.textContent = address
  placeStatusPreview.textContent = is_active ? "Lugar activo" : "Lugar inactivo";
}

function validatePlaceForm(placeCreated) {

  const {
    name,
    id_category,
    address,
    id_user
  } = placeCreated

  if (!name) {
    return "El nombre del lugar es obligatorio"
  }
  if (name.length < 3 || name.length > 150) {
    return "El nombre debe tener mínimo 3 caracteres y maximo 150"
  }

  if (!id_category || id_category <= 0) {
    return "Selecciona una categoria"
  }

  if (!address) {
    return "La dirección es obligatoria"
  }

  if (address.length < 5 || address.length > 250) {
    return "La dirección debe tener minimo 5 caracteres y maximo 250"
  }

  if (!id_user) {
    return "No se encontró el usuario atenticado"
  }

  return true

}

function resetPlacePreview() {
  const placeNamePreview = document.getElementById("place-name-preview")
  const placeDescriptionPreview = document.getElementById("place-description-preview")
  const placeAddressPreview = document.getElementById("place-address-preview")
  const placeStatusPreview = document.getElementById("place-status-preview")

  placeNamePreview.textContent = "Nombre del lugar"
  placeDescriptionPreview.textContent = "La descripción del lugar aparecerá en este espacio."
  placeAddressPreview.textContent = "Dirección por definir"
  placeStatusPreview.textContent = "Lugar activo"
}
