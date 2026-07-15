import { NAV_BAR } from "../components/nav_bar.component"
import { getSession } from "../services/auth.service"
import { postEvent } from "../services/event.service"


export function organizerCreateView() {

  return `
    ${NAV_BAR()}
    <main class="min-h-screen text-blue-950 font-sans bg-gray-50">

      <!-- =====================================================
           ENCABEZADO DEL PERFIL
      ====================================================== -->
      <section class="relative">

        <!-- Imagen de portada -->
        <figure class="absolute inset-x-0 top-0 h-128 overflow-hidden sm:h-120 md:h-75">
          <img
            src="/src/assets/img/hero3.png"
            alt="Barranquilla, su cultura y el Carnaval"
            class="h-full w-full object-cover"
          />

          <!-- Oscurecimiento de la portada -->
          <figcaption
            class="absolute inset-0 bg-black/45"
            aria-hidden="true"
          ></figcaption>
        </figure>

        <!-- Información principal -->
        <article
          class="relative mx-auto flex min-h-128 max-w-7xl flex-col items-center justify-start gap-4 px-4 pb-8 pt-6 text-center text-white sm:min-h-120 sm:px-6 sm:pt-8 md:min-h-70 md:flex-row md:items-center md:justify-start md:gap-5 md:text-left"
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
              />
            </div>
          </figure>

          <!-- Datos del perfil -->
          <section class="max-w-xl">

            <section class="flex flex-wrap items-center gap-2 sm:gap-3 md:justify-start">
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

            <p class="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:mt-4 sm:text-sm md:mx-0">
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto...
            </p>

            <!-- Redes sociales -->
            <nav
              class="mt-4 sm:mt-5"
              aria-label="Redes sociales de Mateo Mercado"
            >
              <ul class="flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start">

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
          class="relative mx-auto -mb-10 max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
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
            <li class="border-r border-slate-200 md:border-r">
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
            <li class="col-span-2 border-t border-slate-200 md:col-span-1 md:border-t-0">
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
           CONTENIDO INFERIOR: CREACIÓN DEL EVENTO
      ====================================================== -->
      <section
        id="organizer-content"
        class="mx-auto mt-24 max-w-7xl px-4 pb-16 sm:px-6"
        aria-live="polite"
      >

        <section
          class="space-y-8"
          aria-labelledby="create-event-title"
        >

          <!-- Encabezado de la vista -->
          <header
            class="flex flex-wrap items-start justify-between gap-5 rounded-[26px] border border-blue-100 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 px-6 py-7 text-white shadow-xl"
          >
            <section>
              <p class="text-xs font-black uppercase tracking-[0.18em] text-blue-200">
                Panel del organizador
              </p>

              <h2
                id="create-event-title"
                class="mt-2 text-3xl font-black tracking-tight"
              >
                Crear nuevo evento
              </h2>

              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-blue-100">
                Completa la información para publicar una nueva experiencia
                en Barranquilla Explora.
              </p>
            </section>

            <button
              type="button"
              data-organizer-view="dashboard"
              class="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-950"
            >
              ← Volver a mis eventos
            </button>
          </header>

          <!-- Formulario -->
          <form
            id="create-event-form"
            class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_350px]"
            novalidate
          >

            <!-- Campos principales -->
            <section class="space-y-7">

              <!-- Información general -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Información general
                </legend>

                <p class="mt-2 text-sm text-slate-500">
                  Indica el nombre, la categoría y la descripción del evento.
                </p>

                <section class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                  <!-- Nombre -->
                  <label class="md:col-span-2">
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Nombre del evento
                    </span>

                    <input
                      id="event-name"
                      name="name"
                      type="text"
                      maxlength="150"
                      placeholder="Ejemplo: Festival del Río Magdalena"
                      required
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <small class="mt-2 block text-xs text-slate-400">
                      Máximo 150 caracteres.
                    </small>
                  </label>

                  <!-- Categoría -->
                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Categoría
                    </span>

                    <select
                      id="event-category"
                      name="id_category"
                      required
                      class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">
                        Selecciona una categoría
                      </option>

                      <option value="1">Festival</option>
                      <option value="2">Concierto</option>
                      <option value="3">Cultura</option>
                      <option value="4">Deportes</option>
                      <option value="5">Gastronomía</option>
                      <option value="6">Feria</option>
                      <option value="7">Teatro</option>
                      <option value="8">Infantil</option>
                    </select>
                  </label>

                  <!-- Estado -->
                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Estado inicial
                    </span>

                    <select
                      id="event-status"
                      name="is_active"
                      class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </label>

                  <!-- Descripción -->
                  <label class="md:col-span-2">
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Descripción
                    </span>

                    <textarea
                      id="event-description"
                      name="description"
                      rows="6"
                      placeholder="Describe las actividades, la experiencia y las razones para asistir al evento."
                      class="w-full resize-none rounded-xl border border-slate-200 p-4 leading-relaxed text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    ></textarea>
                  </label>

                </section>
              </fieldset>

              <!-- Fecha y horario -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Fecha y horario
                </legend>

                <p class="mt-2 text-sm text-slate-500">
                  Define cuándo comenzará y finalizará el evento.
                </p>

                <section class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Fecha inicial
                    </span>

                    <input
                      id="event-start-date"
                      name="start_date"
                      type="date"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Fecha final
                    </span>

                    <input
                      id="event-end-date"
                      name="end_date"
                      type="date"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Hora de inicio
                    </span>

                    <input
                      id="event-start-time"
                      name="start_time"
                      type="time"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                </section>
              </fieldset>

              <!-- Ubicación -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Ubicación
                </legend>

                <p class="mt-2 text-sm text-slate-500">
                  Agrega el lugar y la dirección donde se realizará el evento.
                </p>

                <section class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Lugar del evento
                    </span>

                    <input
                      id="event-location"
                      name="location"
                      type="text"
                      maxlength="255"
                      placeholder="Ejemplo: Gran Malecón del Río"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Dirección
                    </span>

                    <input
                      id="event-address"
                      name="address"
                      type="text"
                      maxlength="500"
                      placeholder="Ejemplo: Avenida del Río, Barranquilla"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                </section>
              </fieldset>

              <!-- Entrada e imagen -->
              <fieldset
                class="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <legend class="px-3 text-xl font-black text-blue-950">
                  Entrada e imagen
                </legend>

                <p class="mt-2 text-sm text-slate-500">
                  Define el precio y proporciona la imagen principal.
                </p>

                <section class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                  <!-- Precio -->
                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Precio de entrada
                    </span>

                    <input
                      id="event-price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value="0"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <small class="mt-2 block text-xs text-slate-400">
                      Utiliza 0 si el evento es gratuito.
                    </small>
                  </label>

                  <!-- Imagen -->
                  <label>
                    <span class="mb-2 block text-sm font-bold text-blue-950">
                      Ruta de la imagen principal
                    </span>

                    <input
                      id="event-image"
                      name="image_main"
                      type="text"
                      maxlength="500"
                      placeholder="/images/eventos/mi-evento.jpg"
                      class="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <small class="mt-2 block text-xs text-slate-400">
                      Guarda la ruta que posteriormente se almacenará en
                      image_main.
                    </small>
                  </label>
                  <button id="save-event-change"
                    type="button"
                    class="h-12 w-full rounded-xl bg-blue-950 font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
                  >
                    Guardar cambios
                  </button>
                </section>
              </fieldset>

              <!-- Mensajes del formulario -->
              <p
                id="event-form-message"
                class="hidden rounded-xl border px-4 py-3 text-sm font-semibold"
                role="status"
                aria-live="polite"
              ></p>
              
            </section>

            <!-- =====================================================
                 PANEL LATERAL
            ====================================================== -->
            <aside class="space-y-5">

              <!-- Vista previa -->
              <article
                class="sticky top-24 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-xl"
              >

                <header
                  class="bg-gradient-to-br from-blue-950 to-blue-700 px-6 py-6 text-white"
                >
                  <p class="text-xs font-black uppercase tracking-[0.16em] text-blue-200">
                    Antes de publicar
                  </p>

                  <h2 class="mt-1 text-xl font-black">
                    Revisa tu evento
                  </h2>
                </header>

                <section class="p-6">

                  <figure
                    class="mb-5 flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100"
                  >
                    <img
                      id="event-image-preview"
                      src="/images/event-placeholder.jpg"
                      alt="Vista previa de la imagen del evento"
                      class="h-full w-full object-cover"
                    />
                  </figure>

                  <h3
                    id="event-name-preview"
                    class="text-xl font-black text-blue-950"
                  >
                    Nombre del evento
                  </h3>

                  <p
                    id="event-description-preview"
                    class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500"
                  >
                    La descripción de tu evento aparecerá en este espacio.
                  </p>

                  <ul
                    class="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600"
                  >

                    <li class="flex items-center gap-3">
                      <span
                        class="flex size-9 items-center justify-center rounded-lg bg-blue-50"
                        aria-hidden="true"
                      >
                        📅
                      </span>

                      <span id="event-date-preview">
                        Fecha por definir
                      </span>
                    </li>

                    <li class="flex items-center gap-3">
                      <span
                        class="flex size-9 items-center justify-center rounded-lg bg-orange-50"
                        aria-hidden="true"
                      >
                        🕘
                      </span>

                      <span id="event-time-preview">
                        Hora por definir
                      </span>
                    </li>

                    <li class="flex items-center gap-3">
                      <span
                        class="flex size-9 items-center justify-center rounded-lg bg-purple-50"
                        aria-hidden="true"
                      >
                        📍
                      </span>

                      <span id="event-location-preview">
                        Lugar por definir
                      </span>
                    </li>

                    <li class="flex items-center gap-3">
                      <span
                        class="flex size-9 items-center justify-center rounded-lg bg-green-50"
                        aria-hidden="true"
                      >
                        🎟️
                      </span>

                      <span id="event-price-preview">
                        Evento gratuito
                      </span>
                    </li>

                  </ul>

                </section>

                <footer class="space-y-3 border-t border-slate-100 p-6">

                  <button
                    type="submit"
                    class="h-12 w-full rounded-xl bg-blue-950 font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
                  >
                    Publicar evento
                  </button>

                  <button
                    type="button"
                    data-organizer-view="dashboard"
                    class="h-12 w-full rounded-xl border border-blue-600 font-bold text-blue-600 transition hover:bg-blue-50"
                  >
                    Cancelar
                  </button>

                </footer>

              </article>

              <!-- Recomendaciones -->
              <aside
                class="rounded-2xl border border-yellow-200 bg-yellow-50 p-5"
                aria-label="Recomendaciones para publicar"
              >
                <h3 class="font-black text-yellow-800">
                  Recomendaciones
                </h3>

                <ul class="mt-3 space-y-2 text-sm leading-relaxed text-yellow-700">
                  <li>• Utiliza un nombre claro y atractivo.</li>
                  <li>• Verifica correctamente la fecha.</li>
                  <li>• Describe las actividades principales.</li>
                  <li>• Agrega una imagen de buena calidad.</li>
                </ul>
              </aside>

            </aside>

          </form>

        </section>

      </section>

    </main>
    `
}

export function organizerCreateEvents() {

  const formCreateEvent = document.getElementById("create-event-form")
  const saveChangesButton = document.getElementById("save-event-change")
  if (!formCreateEvent) {
    return
  }
  if (!saveChangesButton) {
    return
  }




  saveChangesButton.addEventListener("click", function (event) {
    event.preventDefault()

    const eventCreated = getEventData()

    const validationResult = validateEventForm(eventCreated)

    if (validationResult !== true) {
      alert(validationResult)
      return
    }

    udapteEventPreview(eventCreated)

  })

  formCreateEvent.addEventListener("submit", async function (event) {
    event.preventDefault()

    const eventCreated = getEventData()

    const validationResult = validateEventForm(eventCreated);

    if (validationResult !== true) {
      alert(validationResult);
      return;
    }

    //Esta seguro de los cambios?
    
      const result = await postEvent(eventCreated)
      alert("Evento publicado correctamente.")

      formCreateEvent.reset()

    
  })
}

function getEventData() {

  const name = document.getElementById("event-name")//
  const id_category = document.getElementById("event-category")//
  const description = document.getElementById("event-description")//
  const start_date = document.getElementById("event-start-date")//
  const end_date = document.getElementById("event-end-date")//
  const start_time = document.getElementById("event-start-time")//
  const price = document.getElementById("event-price")//
  const address = document.getElementById("event-address")//
  const image_main = document.getElementById("event-image")//
  const location = document.getElementById("event-location")//
  //id_user
  const session = getSession()
  const idUser = session.user.id

  return {
    name: name.value.trim(),
    id_category: Number(id_category.value),
    location: location.value.trim(),
    description: description.value,
    start_date: start_date.value,
    end_date: end_date.value,
    start_time: start_time.value,
    price: Number(price.value),
    address: address.value,
    image_main: image_main.value,
    id_user: idUser
  }
}

function udapteEventPreview(eventCreated) {

  const { name, location, description, start_date,
    end_date, start_time, price, address, image_main
  } = eventCreated

  const eventNamePreview = document.getElementById("event-name-preview")
  const eventDescriptionPreview = document.getElementById("event-description-preview")
  const eventDatePreview = document.getElementById("event-date-preview")
  const eventTimePreview = document.getElementById("event-time-preview")
  const eventLocationPreview = document.getElementById("event-location-preview")
  const eventPricePreview = document.getElementById("event-price-preview")
  const eventImagePreview = document.getElementById("event-image-preview")

  eventNamePreview.textContent = name
  eventDescriptionPreview.textContent = description
  eventDatePreview.textContent = start_date === end_date ? start_date : `${start_date} - ${end_date}`
  eventTimePreview.textContent = start_time
  eventLocationPreview.textContent = location
  eventPricePreview.textContent = Number(price) === 0 ? "Evento gratuito" : `$${price.toLocaleString("es-CO")}`
  eventImagePreview.src = image_main


}

function validateEventForm(eventCreated) {

  const { name, id_category, start_date, end_date, price } = eventCreated


  if (!name) {
    return "El nombre del evento es obligatorio"
  } else if (name.length < 3) {
    return "El nombre debe tener minimo 3 caracteres"
  } else if (name.length > 150) {
    return "El nombre no puede superar los 150 caracteres"
  }

  if (id_category <= 0 || !id_category) {
    return "Seleccione una categoria"
  }

  if (!start_date) {
    return "La fecha inicial es obligatoria"
  }

  if (!end_date) {
    return "La fecha de finalización es obligatoria"
  }

  const starDate = new Date(start_date)
  const endDate = new Date(end_date)
  const currentDate = new Date()

  if (starDate > endDate) {
    return "La fecha final no puede ser anterior a la fecha inicial"
  } else if (starDate < currentDate || endDate < currentDate) {
    return "Las fechas del evento deben ser superior a la fecha actual"
  }

  const numberPrice = Number(price)

  if (price === "") {
    return "El precio es obligatorio"
  } else if (Number(price) < 0) {
    return "El precio no puede ser negativo"
  } else if (!Number(numberPrice)) {
    return "El precio tiene que ser un número"
  }

  return true
}