import { initializeMainNavigationEvents, renderMainNavigation } from "../../components/layout/MainNavigation.js";
import { navigateTo } from "../../router/AppRouter.js";
import { getSession } from "../../services/authService.js";
import { postPlace } from "../../services/destinationService.js";
import { alertaError, alertaExitosa } from "../../utils/alertsss.js";
import { renderProfileInfo, renderProfileInfoEvents } from "./renderprofileorganizador.js";

export function renderCreatePlaceView() {

  return `
    ${renderMainNavigation()}

    <main class="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-blue-950">
      <!-- Fondos decorativos: no afectan la interacción -->
      <div class="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden" aria-hidden="true">
        <div class="absolute -left-28 top-24 size-80 rounded-full bg-purple-200/40 blur-3xl"></div>
        <div class="absolute -right-20 top-36 size-96 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div class="absolute left-1/2 top-20 size-64 -translate-x-1/2 rounded-full bg-yellow-100/60 blur-3xl"></div>
      </div>

      ${renderProfileInfo()}

      <!-- =====================================================
           CONTENIDO DINÁMICO DEL ORGANIZADOR
      ====================================================== -->
      <section
        id="organizer-content"
        class="relative z-10 mx-auto mt-10 max-w-[1440px] px-4 pb-20 sm:px-6 lg:mt-14 lg:px-10"
        aria-live="polite"
      >
        <section class="space-y-7" aria-labelledby="create-place-title">

          <!-- ENCABEZADO DE CREACIÓN -->
          <header
            class="relative overflow-hidden rounded-[30px] border border-white/70 bg-gradient-to-br from-blue-950 via-[#22176f] to-purple-700 px-6 py-7 text-white shadow-[0_24px_60px_-24px_rgba(23,37,84,0.65)] sm:px-8 sm:py-9 lg:px-10"
          >
            <div class="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full border-[42px] border-white/5" aria-hidden="true"></div>
            <div class="pointer-events-none absolute -bottom-20 right-36 size-52 rounded-full bg-purple-400/10 blur-2xl" aria-hidden="true"></div>

            <div class="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <section class="max-w-3xl">
                <p class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-purple-100 backdrop-blur-sm">
                  <span class="size-2 rounded-full bg-yellow-300 shadow-[0_0_0_5px_rgba(253,224,71,0.12)]" aria-hidden="true"></span>
                  Panel del organizador
                </p>

                <h2
                  id="create-place-title"
                  class="text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-[44px]"
                >
                  Crear lugar turístico
                </h2>

                <p class="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
                  Comparte un destino auténtico con la comunidad y ayuda a que
                  más personas descubran todo lo que Barranquilla tiene para ofrecer.
                </p>
              </section>

              <button
                id="btn-back-organizer-profile"
                type="button"
                class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-blue-950 focus:outline-none focus:ring-4 focus:ring-white/20 sm:w-auto"
              >
                <span aria-hidden="true">←</span>
                Volver a mis sitios
              </button>
            </div>
          </header>

          
          <!-- FORMULARIO -->
          <form
            id="create-place-form"
            class="grid grid-cols-1 items-start gap-7 xl:grid-cols-[minmax(0,1fr)_380px]"
            novalidate
          >
            <!-- CAMPOS PRINCIPALES -->
            <section class="min-w-0 space-y-6">

              <!-- INFORMACIÓN GENERAL -->
              <fieldset
                class="group rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-[0_14px_40px_-26px_rgba(15,23,42,0.35)] transition hover:border-purple-200 sm:p-7"
              >
                <legend class="sr-only">Información general</legend>

                <header class="flex items-start gap-4 border-b border-slate-100 pb-5">
                  <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-900 text-xl text-white shadow-lg shadow-purple-900/20" aria-hidden="true">✦</span>
                  <section>
                    <p class="text-[11px] font-black uppercase tracking-[0.16em] text-purple-600">Paso 1</p>
                    <h2 class="mt-1 text-xl font-black tracking-tight text-blue-950 sm:text-2xl">Información general</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-500">Cuéntanos qué hace especial a este lugar.</p>
                  </section>
                </header>

                <section class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <!-- Nombre -->
                  <label class="md:col-span-2">
                    <span class="mb-2 flex items-center justify-between gap-3 text-sm font-black text-blue-950">
                      <span>Nombre del lugar <b class="text-purple-600">*</b></span>
                      <small class="font-semibold text-slate-400">Máx. 150</small>
                    </span>

                    <input
                      id="place-name"
                      name="name"
                      type="text"
                      maxlength="150"
                      placeholder="Ejemplo: Museo del Carnaval"
                      autocomplete="off"
                      required
                      class="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                    />

                    <small class="mt-2 block text-xs text-slate-400">
                      Usa el nombre oficial o el más reconocido por los visitantes.
                    </small>
                  </label>

                  <!-- Categoría -->
                  <label>
                    <span class="mb-2 block text-sm font-black text-blue-950">
                      Categoría <b class="text-purple-600">*</b>
                    </span>

                    <select
                      id="place-category"
                      name="id_category"
                      required
                      class="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-slate-700 outline-none transition hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                    >
                      <option value="">Selecciona una categoría</option>
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
                    <span class="mb-2 block text-sm font-black text-blue-950">Estado inicial</span>

                    <select
                      id="place-status"
                      name="is_active"
                      class="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-slate-700 outline-none transition hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </label>

                  <!-- Descripción -->
                  <label class="md:col-span-2">
                    <span class="mb-2 flex items-center justify-between gap-3 text-sm font-black text-blue-950">
                      <span>Descripción</span>
                      <small class="font-semibold text-slate-400">Sé claro y atractivo</small>
                    </span>

                    <textarea
                      id="place-description"
                      name="description"
                      rows="7"
                      placeholder="Describe la historia, características, atractivos y experiencias que ofrece el lugar."
                      class="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 p-4 leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                    ></textarea>

                    <small class="mt-2 block text-xs text-slate-400">
                      Explica por qué este lugar debería ser visitado.
                    </small>
                  </label>
                </section>
              </fieldset>

              <!-- UBICACIÓN -->
              <fieldset
                class="rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-[0_14px_40px_-26px_rgba(15,23,42,0.35)] transition hover:border-blue-200 sm:p-7"
              >
                <legend class="sr-only">Ubicación</legend>

                <header class="flex items-start gap-4 border-b border-slate-100 pb-5">
                  <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-900 text-xl text-white shadow-lg shadow-purple-900/20" aria-hidden="true">⌖</span>
                  <section>
                    <p class="text-[11px] font-black uppercase tracking-[0.16em] text-purple-600">Paso 2</p>
                    <h2 class="mt-1 text-xl font-black tracking-tight text-blue-950 sm:text-2xl">Ubicación</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-500">Ayuda a los visitantes a encontrar el lugar fácilmente.</p>
                  </section>
                </header>

                <section class="mt-6">
                  <label>
                    <span class="mb-2 block text-sm font-black text-blue-950">Dirección</span>

                    <div class="relative">
                      <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-purple-600" aria-hidden="true">⌖</span>
                      <input
                        id="place-address"
                        name="address"
                        type="text"
                        maxlength="250"
                        placeholder="Ejemplo: Carrera 54 # 49B-39, Barranquilla"
                        autocomplete="street-address"
                        class="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                      />
                    </div>

                    <small class="mt-2 block text-xs text-slate-400">
                      Máximo 250 caracteres. Incluye barrio o sector cuando sea necesario.
                    </small>
                  </label>
                </section>

                <footer class="mt-6 flex justify-end border-t border-slate-100 pt-5">
                  <button
                    id="save-place-change"
                    type="button"
                    class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-950 px-6 text-sm font-black text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
                  >
                    <span aria-hidden="true">✓</span>
                    Guardar cambios
                  </button>
                </footer>
              </fieldset>

              <!-- INFORMACIÓN DE PUBLICACIÓN -->
              <fieldset
                class="rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-[0_14px_40px_-26px_rgba(15,23,42,0.35)] sm:p-7"
              >
                <legend class="sr-only">Información de publicación</legend>

                <header class="flex items-start gap-4 border-b border-slate-100 pb-5">
                  <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-900 text-xl text-white shadow-lg shadow-purple-900/20" aria-hidden="true">✓</span>
                  <section>
                    <p class="text-[11px] font-black uppercase tracking-[0.16em] text-purple-600">Paso 3</p>
                    <h2 class="mt-1 text-xl font-black tracking-tight text-blue-950 sm:text-2xl">Información de publicación</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-500">Todo listo para asociar y publicar tu lugar.</p>
                  </section>
                </header>

                <section class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <article class="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                    <span class="absolute -right-5 -top-5 size-20 rounded-full bg-blue-100/60" aria-hidden="true"></span>
                    <span class="relative text-xl" aria-hidden="true">👤</span>
                    <p class="relative mt-4 text-[11px] font-black uppercase tracking-wider text-blue-600">Propietario</p>
                    <h3 class="relative mt-1 font-black text-blue-950">Usuario autenticado</h3>
                    <p class="relative mt-2 text-sm leading-6 text-slate-600">
                      El sistema asociará automáticamente el lugar con tu cuenta de organizador.
                    </p>
                  </article>

                  <article class="relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5">
                    <span class="absolute -right-5 -top-5 size-20 rounded-full bg-purple-100/60" aria-hidden="true"></span>
                    <span class="relative text-xl" aria-hidden="true">◉</span>
                    <p class="relative mt-4 text-[11px] font-black uppercase tracking-wider text-purple-600">Publicación</p>
                    <h3 class="relative mt-1 font-black text-blue-950">Estado controlado</h3>
                    <p class="relative mt-2 text-sm leading-6 text-slate-600">
                      Puedes publicar el lugar como activo o guardarlo inicialmente como inactivo.
                    </p>
                  </article>
                </section>
              </fieldset>

              <!-- MENSAJES DEL FORMULARIO -->
              <p
                id="place-form-message"
                class="hidden rounded-2xl border px-4 py-3 text-sm font-semibold"
                role="status"
                aria-live="polite"
              ></p>
            </section>

            <!-- PANEL LATERAL -->
            <aside class="min-w-0 space-y-5 xl:sticky xl:top-6">
              <!-- VISTA PREVIA -->
              <article
                class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_55px_-30px_rgba(15,23,42,0.45)]"
              >
                <header class="relative overflow-hidden bg-gradient-to-br from-blue-950 via-[#25206f] to-purple-700 px-6 py-6 text-white">
                  <div class="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full border-[24px] border-white/5" aria-hidden="true"></div>

                  <section class="relative flex items-start justify-between gap-4">
                    <div>
                      <p class="text-[10px] font-black uppercase tracking-[0.18em] text-purple-200">Vista previa</p>
                      <h2 class="mt-1 text-xl font-black">Así verán tu lugar</h2>
                    </div>

                    <span class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold backdrop-blur">EN VIVO</span>
                  </section>
                </header>

                <section class="p-5 sm:p-6">
                  <figure class="relative mb-5 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100">
                    <img
                      src="/images/place-placeholder.jpg"
                      alt="Imagen representativa de un lugar turístico"
                      class="h-full w-full object-cover"
                    />

                    <figcaption class="absolute bottom-3 left-3 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-purple-700 shadow-sm backdrop-blur">
                      Lugar turístico
                    </figcaption>
                  </figure>

                  <h3 id="place-name-preview" class="text-xl font-black tracking-tight text-blue-950">
                    Nombre del lugar
                  </h3>

                  <p id="place-description-preview" class="mt-3 min-h-[80px] line-clamp-4 text-sm leading-6 text-slate-500">
                    La descripción del lugar aparecerá en este espacio mientras completas el formulario.
                  </p>

                  <ul class="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
                    <li class="flex items-start gap-3">
                      <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-700" aria-hidden="true">⌖</span>
                      <span id="place-address-preview" class="pt-2">Dirección por definir</span>
                    </li>

                    <li class="flex items-start gap-3">
                      <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600" aria-hidden="true">✓</span>
                      <span id="place-status-preview" class="pt-2">Lugar activo</span>
                    </li>
                  </ul>
                </section>

                <footer class="space-y-3 border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6">
                  <button
                    type="submit"
                    class="h-[52px] w-full rounded-2xl bg-gradient-to-r from-purple-700 to-purple-600 font-black text-white shadow-lg shadow-purple-700/25 transition hover:-translate-y-0.5 hover:from-purple-800 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200"
                  >
                    Publicar lugar
                  </button>

                  <button
                    id="cancel-place"
                    type="button"
                    class="h-12 w-full rounded-2xl border border-purple-200 bg-white font-black text-purple-700 transition hover:border-purple-400 hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-100"
                  >
                    Cancelar
                  </button>

                  <p class="text-center text-[11px] leading-5 text-slate-400">
                    Podrás editar esta información más adelante desde tu perfil.
                  </p>
                </footer>
              </article>

              <!-- RECOMENDACIONES -->
              <section
                class="rounded-[22px] border border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50/60 p-5"
                aria-labelledby="place-recommendations-title"
              >
                <header class="flex items-center gap-3">
                  <span class="grid size-10 place-items-center rounded-xl bg-yellow-200/70 text-lg" aria-hidden="true">✦</span>
                  <section>
                    <p class="text-[10px] font-black uppercase tracking-wider text-yellow-700">Consejos útiles</p>
                    <h3 id="place-recommendations-title" class="font-black text-yellow-900">Antes de publicar</h3>
                  </section>
                </header>

                <ul class="mt-4 space-y-3 text-sm leading-6 text-yellow-800">
                  <li class="flex gap-2"><span class="font-black text-yellow-600">✓</span><span>Utiliza el nombre oficial del lugar.</span></li>
                  <li class="flex gap-2"><span class="font-black text-yellow-600">✓</span><span>Selecciona la categoría adecuada.</span></li>
                  <li class="flex gap-2"><span class="font-black text-yellow-600">✓</span><span>Escribe una descripción clara y atractiva.</span></li>
                  <li class="flex gap-2"><span class="font-black text-yellow-600">✓</span><span>Verifica que la dirección sea correcta.</span></li>
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

  if (!formCreatePlace || !savePlaceChangeButton) {
    return
  }

  if (backOrganizerButton) {
    backOrganizerButton.addEventListener("click", function () {
      navigateTo("/perfilorganizador")
    })
  }

  if (cancelPlaceButton) {
    cancelPlaceButton.addEventListener("click", function () {
      navigateTo("/perfilorganizador")
    })
  }

  savePlaceChangeButton.addEventListener("click", function () {
    const placeCreated = getPlaceData()

    const resultValidation = validatePlaceForm(placeCreated)

    if (resultValidation !== true) {
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
      console.error("Error creando lugar:", error);
      alertaError(
        error.message || "No se pudo crear el lugar"
      );
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
