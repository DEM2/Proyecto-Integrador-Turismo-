import { renderMainNavigation } from "../../components/layout/MainNavigation.js";
import { getSession } from "../../services/authService.js";
import { postPlace } from "../../services/destinationService.js";

export function renderCreatePlaceView() {

  return `
    ${renderMainNavigation()}
    <main class="min-h-screen bg-gray-50 font-sans text-blue-950">

      <!-- =====================================================
           ENCABEZADO DEL PERFIL
      ====================================================== -->
      <section class="relative pb-6">

        <!-- Imagen de portada -->
        <figure
          class="absolute inset-x-0 top-0 h-128 overflow-hidden sm:h-120 md:h-75"
        >
          <img
            src="/src/assets/img/hero3.png"
            alt="Barranquilla, su cultura y el Carnaval"
            class="h-full w-full object-cover"
          />

          <figcaption
            class="absolute inset-0 bg-black/45"
            aria-hidden="true"
          ></figcaption>
        </figure>

        <!-- Información principal -->
        <article
          class="relative z-10 mx-auto flex min-h-128 max-w-7xl flex-col items-center justify-start gap-4 px-4 pb-8 pt-6 text-center text-white sm:min-h-120 sm:px-6 sm:pt-8 md:min-h-70 md:flex-row md:items-center md:justify-start md:gap-5 md:text-left"
        >

          <!-- Foto del usuario -->
          <figure class="relative shrink-0">
            <img
              src="/src/assets/img/familias.webp"
              alt="Foto de perfil de Mateo Mercado"
              class="size-50 rounded-full border-4 border-white object-cover shadow-xl sm:size-40 md:size-62"
            />

            <figcaption class="sr-only">
              Foto de perfil de Mateo Mercado
            </figcaption>

            <div
              class="absolute -bottom-2 right-1 flex items-center justify-center rounded-full"
            >
              <img
                src="/src/assets/img/explorer_morado.png"
                alt=""
                class="size-15 object-contain"
                aria-hidden="true"
              />
            </div>
          </figure>

          <!-- Datos del perfil -->
          <section class="max-w-xl">

            <section
              class="flex flex-wrap items-center gap-2 sm:gap-3 md:justify-start"
            >
              <h2
                id="profile-name"
                class="w-full text-2xl font-bold leading-tight sm:w-auto sm:text-3xl md:text-4xl"
              >
                Mateo Mercado
              </h2>

              <button
                type="button"
                id="btn-follow"
                class="cursor-pointer rounded-full bg-purple-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-purple-600"
              >
                Seguir
              </button>
            </section>

            <p class="mt-1 text-sm font-semibold sm:text-base">
              @Matero123_sew
            </p>

            <p
              class="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:mt-4 sm:text-sm md:mx-0"
            >
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto...
            </p>

            <!-- Redes sociales -->
            <nav
              class="mt-4 sm:mt-5"
              aria-label="Redes sociales de Mateo Mercado"
            >
              <ul
                class="flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start"
              >

                <li>
                  <a
                    href="#"
                    class="flex cursor-pointer items-center gap-1.5 rounded-full bg-black/15 px-2 py-1 text-xs font-semibold transition hover:bg-black/25 sm:gap-2 sm:text-sm md:bg-transparent md:hover:bg-black/20"
                  >
                    <img
                      src="/src/assets/img/instagram.svg"
                      alt=""
                      class="size-5 sm:size-6"
                      aria-hidden="true"
                    />

                    mateo mercado
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="flex cursor-pointer items-center gap-1.5 rounded-full bg-black/15 px-2 py-1 text-xs font-semibold transition hover:bg-black/25 sm:gap-2 sm:text-sm md:bg-transparent md:hover:bg-black/20"
                  >
                    <img
                      src="/src/assets/img/tiktok.svg"
                      alt=""
                      class="size-5 sm:size-6"
                      aria-hidden="true"
                    />

                    mateo mercado
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="flex cursor-pointer items-center gap-1.5 rounded-full bg-black/15 px-2 py-1 text-xs font-semibold transition hover:bg-black/25 sm:gap-2 sm:text-sm md:bg-transparent md:hover:bg-black/20"
                  >
                    <img
                      src="/src/assets/img/facebook.svg"
                      alt=""
                      class="size-5 sm:size-6"
                      aria-hidden="true"
                    />

                    mateo mercado
                  </a>
                </li>

              </ul>
            </nav>

          </section>
        </article>

        <!-- ESTADÍSTICAS -->
        <nav
          class="relative z-20 mx-auto -mt-10 w-[calc(100%-2rem)] max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
          aria-label="Estadísticas y contenido del perfil"
        >
          <ul class="grid grid-cols-2 md:grid-cols-5">

            <!-- Seguidores -->
            <li class="border-b border-r border-slate-200 md:border-b-0">
              <button
                type="button"
                data-profile-section="followers"
                class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
              >
                <img
                  src="/src/assets/img/seguidores_morado.svg"
                  alt=""
                  class="size-8"
                  aria-hidden="true"
                />

                <span>
                  <strong class="block text-2xl font-black text-blue-950">
                    1000
                  </strong>

                  <span class="text-sm text-slate-600">
                    Seguidores
                  </span>
                </span>
              </button>
            </li>

            <!-- Seguidos -->
            <li class="border-b border-slate-200 md:border-b-0 md:border-r">
              <button
                type="button"
                data-profile-section="following"
                class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
              >
                <img
                  src="/src/assets/img/seguidos_morado.svg"
                  alt=""
                  class="size-8"
                  aria-hidden="true"
                />

                <span>
                  <strong class="block text-2xl font-black text-blue-950">
                    1000
                  </strong>

                  <span class="text-sm text-slate-600">
                    Seguidos
                  </span>
                </span>
              </button>
            </li>

            <!-- Reseñas -->
            <li class="border-r border-slate-200">
              <button
                type="button"
                data-profile-section="reviews"
                class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
              >
                <img
                  src="/src/assets/img/reseñas.svg"
                  alt=""
                  class="size-10"
                  aria-hidden="true"
                />

                <span>
                  <strong class="block text-2xl font-black text-blue-950">
                    10
                  </strong>

                  <span class="text-sm text-slate-600">
                    Reseñas
                  </span>
                </span>
              </button>
            </li>

            <!-- Sitios -->
            <li class="border-t border-slate-200 md:border-r md:border-t-0">
              <button
                type="button"
                data-profile-section="places"
                class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
              >
                <img
                  src="/src/assets/img/location4.svg"
                  alt=""
                  class="size-10"
                  aria-hidden="true"
                />

                <span>
                  <strong class="block text-2xl font-black text-blue-950">
                    18
                  </strong>

                  <span class="text-sm text-slate-600">
                    Sitios
                  </span>
                </span>
              </button>
            </li>

            <!-- Eventos -->
            <li
              class="col-span-2 border-t border-slate-200 md:col-span-1 md:border-t-0"
            >
              <button
                type="button"
                data-profile-section="events"
                class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
              >
                <img
                  src="/src/assets/img/calendar2.svg"
                  alt=""
                  class="size-10"
                  aria-hidden="true"
                />

                <span>
                  <strong class="block text-2xl font-black text-blue-950">
                    12
                  </strong>

                  <span class="text-sm text-slate-600">
                    Eventos
                  </span>
                </span>
              </button>
            </li>

          </ul>
        </nav>

      </section>

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
              type="button"
              data-organizer-view="dashboard"
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
                    id="save-place-button"
                    type="button"
                    class="h-12 w-full rounded-xl bg-purple-700 font-bold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800"
                  >
                    Guardar Cambios
                  </button>

                  <button
                    type="button"
                    data-organizer-view="dashboard"
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

export function renderCreatePlaceEvents(params) {
  const formCreatePlace = document.getElementById("create-place-form");

  if (!formCreatePlace) {
    return
  }

  formCreatePlace.addEventListener("submit", async function (event) {
    event.preventDefault();

    const placeCreated = getPlaceData()

    const validationResult = validatePlaceForm(placeCreated)

    if (validationResult !== true) {
      alert(validationResult)
      return
    }

    updatePlacePreview(placeCreated)

    try {
      const result = await postPlace(placeCreated)

      alert("Lugar publicado correctamente")
      formCreatePlace.reset()
      //FUNCION PARA RETROCEDER
    } catch (error) {
      alert("No se pudo crear el lugar")
    }

    // Después puedes validar y enviar placeCreated al backend.
  });
  resetPlacePreview()
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
    fk_places_user: idUser,
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
    fk_places_user
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

  if (!fk_places_user) {
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