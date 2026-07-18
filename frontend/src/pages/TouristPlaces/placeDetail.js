import { initializeMainNavigationEvents, renderMainNavigation } from "../../components/layout/MainNavigation.js";
import { getPlaceById } from "../../services/destinationService.js";
import { Check, Compass, Heart, MapPin, Share2, Star, X } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";

let currentPlace = null;

export async function renderPlaceDetailView() {

    try {
        const idPlace = Number(localStorage.getItem("selectedPlaceId"))

        if (!idPlace) {
            throw new Error("No se encontró el ID del lugar")
        }

        currentPlace = await getPlaceById(idPlace)

        const placeDetail = currentPlace

        const placeImage = placeDetail.image_main || "/src/assets/images/hero.png"



        return `
    <main class="min-h-screen bg-slate-50 font-sans text-blue-950">

      ${renderMainNavigation()}

      <!-- =====================================================
           CONTENIDO PRINCIPAL
      ====================================================== -->
      <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        <!-- BREADCRUMB -->
        <nav
          class="mb-4 text-sm text-slate-500"
          aria-label="Ruta de navegación"
        >
          <ol class="flex flex-wrap items-center gap-2">

            <li>
              <a
                href="/"
                class="transition hover:text-purple-600"
              >
                Inicio
              </a>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <a
                href="/lugares"
                class="transition hover:text-purple-600"
              >
                Lugares
              </a>
            </li>

            <li aria-hidden="true">/</li>

            <li
              class="max-w-52 truncate font-semibold text-blue-950 sm:max-w-none"
              aria-current="page"
            >
              ${placeDetail.name}
            </li>

          </ol>
        </nav>

        <!-- =====================================================
             HERO DEL LUGAR
        ====================================================== -->
        <header
          class="relative overflow-hidden rounded-[32px] bg-white shadow-xl"
        >

          <figure class="relative h-[280px] w-full sm:h-[330px] md:h-[380px]">

            <img
              src="${placeImage}"
              alt="${placeDetail.name}"
              class="h-full w-full object-cover"
            />

            <figcaption
              class="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/10 to-transparent"
              aria-hidden="true"
            ></figcaption>

            <!-- Tipo de contenido -->
            <p
              class="absolute bottom-8 left-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-wider text-purple-700 shadow-lg backdrop-blur-sm sm:left-8"
            >
              Lugar turístico
            </p>

            <!-- Botones flotantes -->
            <ul class="absolute right-4 top-4 flex gap-3 sm:right-6 sm:top-6">

              <li>
                <button
                  id="btn-favorite-place"
                  type="button"
                  aria-label="Agregar lugar a favoritos"
                  class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-xl shadow-lg transition hover:scale-105 hover:bg-purple-50 hover:text-purple-700"
                >
                  ${renderIconSvg(Heart, { class: "size-5", strokeWidth: 2 })}
                </button>
              </li>

              <li>
                <button
                  id="btn-share-place"
                  type="button"
                  aria-label="Compartir lugar"
                  class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-xl shadow-lg transition hover:scale-105 hover:bg-purple-50 hover:text-purple-700"
                >
                  ${renderIconSvg(Share2, { class: "size-5", strokeWidth: 2 })}
                </button>
              </li>

            </ul>

          </figure>

          <!-- =================================================
               TARJETA PRINCIPAL SUPERPUESTA
          ================================================== -->
          <article
            class="relative mx-3 -mt-16 mb-5 rounded-[24px] border border-slate-100 bg-white p-5 shadow-2xl sm:mx-6 sm:p-6 md:mx-8"
          >

            <header class="flex flex-wrap items-start justify-between gap-4">

              <section class="min-w-0">

                <h1
                  class="text-2xl font-black leading-tight tracking-tight text-blue-950 sm:text-3xl lg:text-4xl"
                >
                  ${placeDetail.name}
                </h1>

                <!-- Calificación -->
                <p class="mt-3 flex flex-wrap items-center gap-2 text-sm">

                  <span
                    class="flex items-center gap-0.5 text-yellow-400"
                    aria-label="Calificación de cinco estrellas"
                  >
                    ${renderIconSvg(Star, { class: "size-4 fill-current", strokeWidth: 2 })}
                    ${renderIconSvg(Star, { class: "size-4 fill-current", strokeWidth: 2 })}
                    ${renderIconSvg(Star, { class: "size-4 fill-current", strokeWidth: 2 })}
                    ${renderIconSvg(Star, { class: "size-4 fill-current", strokeWidth: 2 })}
                    ${renderIconSvg(Star, { class: "size-4 fill-current", strokeWidth: 2 })}
                  </span>

                  <strong class="text-blue-950">
                    4.9
                  </strong>

                  <span
                    id="reviews-count"
                    class="text-slate-400"
                  >
                    (0 reseñas)
                  </span>

                </p>

              </section>

              <span
                class="${placeDetail.is_active === true ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"  } rounded-full px-4 py-2 text-xs font-black shadow-sm"
              >
                ${placeDetail.is_active === true ? "Disponible" : "No disponible"}
              </span>

            </header>

            <!-- Información rápida -->
            <ul
              class="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 text-sm text-slate-600 md:grid-cols-3"
            >

              <li
                class="flex items-center gap-3 rounded-xl bg-purple-50/70 p-3"
              >
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm"
                  aria-hidden="true"
                >
                  ${renderIconSvg(MapPin, { class: "size-5", strokeWidth: 2 })}
                </span>

                <span class="min-w-0">
                  <strong class="block text-xs text-blue-950">
                    Dirección
                  </strong>

                  <span class="block truncate">
                    ${placeDetail.address || "Dirección no disponible"}
                  </span>
                </span>
              </li>

              <li
                class="flex items-center gap-3 rounded-xl bg-blue-50/70 p-3"
              >
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm"
                  aria-hidden="true"
                >
                  ${renderIconSvg(Compass, { class: "size-5", strokeWidth: 2 })}
                </span>

                <span>
                  <strong class="block text-xs text-blue-950">
                    Tipo
                  </strong>

                  Lugar turístico
                </span>
              </li>

              <li
                class="flex items-center gap-3 rounded-xl bg-emerald-50/70 p-3"
              >
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm"
                  aria-hidden="true"
                >
                  ${renderIconSvg(placeDetail.is_active ? Check : X, { class: "size-5", strokeWidth: 2 })}
                </span>

                <span>
                  <strong class="block text-xs text-blue-950">
                    Estado
                  </strong>

                  ${placeDetail.is_active ? "Disponible para visitar" : "No disponible"}
                </span>
              </li>

            </ul>

          </article>

        </header>

        <!-- =====================================================
             CUERPO DEL LUGAR
        ====================================================== -->
        <section
          class="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
        >

          <!-- COLUMNA PRINCIPAL -->
          <section class="min-w-0 space-y-8">

            <!-- SOBRE EL LUGAR -->
            <article
              id="informacion"
              class="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm sm:p-7"
            >

              <header class="mb-5">

                <p
                  class="text-xs font-black uppercase tracking-[0.16em] text-purple-600"
                >
                  Descubre Barranquilla
                </p>

                <h2
                  class="mt-1 text-2xl font-black text-blue-950"
                >
                  Sobre el lugar
                </h2>

              </header>

              <p class="leading-7 text-slate-600">
                ${placeDetail.description ||
            "Actualmente este lugar no tiene una descripción disponible."
            }
              </p>

              <footer
                class="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5"
              >

                <button
                  id="btn-share-place-description"
                  type="button"
                  class="rounded-xl border border-purple-600 px-5 py-3 text-sm font-bold text-purple-600 transition hover:bg-purple-600 hover:text-white"
                >
                  Compartir lugar
                </button>

                <button
                  id="btn-add-place-itinerary"
                  type="button"
                  class="rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
                >
                  + Agregar a itinerario
                </button>

              </footer>

            </article>

            <!-- UBICACIÓN -->
            <article
              id="ubicacion"
              class="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm sm:p-7"
            >

              <header class="mb-5">

                <p
                  class="text-xs font-black uppercase tracking-[0.16em] text-purple-600"
                >
                  Cómo llegar
                </p>

                <h2
                  class="mt-1 text-2xl font-black text-blue-950"
                >
                  Ubicación
                </h2>

              </header>

              <address
                class="mb-5 flex items-start gap-3 not-italic text-slate-600"
              >
                <span
                  class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600"
                  aria-hidden="true"
                >
                  ${renderIconSvg(MapPin, { class: "size-5", strokeWidth: 2 })}
                </span>

                <span class="pt-2">
                  ${placeDetail.address || "Dirección no disponible"}
                </span>
              </address>

              <figure
                class="relative h-64 overflow-hidden rounded-2xl border border-slate-200 bg-blue-50"
              >
                <img
                  src="/src/assets/images/hero.png"
                  alt="Mapa de ubicación de ${placeDetail.name}"
                  class="h-full w-full object-cover"
                />

                <figcaption
                  class="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-2 text-xs font-bold text-blue-950 shadow-md backdrop-blur-sm"
                >
                  Ubicación aproximada
                </figcaption>
              </figure>

              <footer class="mt-5">
                <button
                  id="btn-open-place-map"
                  type="button"
                  class="rounded-xl border border-blue-600 px-5 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  Abrir ubicación
                </button>
              </footer>

            </article>

            <!-- COMENTARIOS -->
            <article
              id="comentarios"
              class="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm sm:p-7"
            >

              <header
                class="mb-5 flex flex-wrap items-center justify-between gap-4"
              >

                <section>
                  <p
                    class="text-xs font-black uppercase tracking-[0.16em] text-purple-600"
                  >
                    Experiencias de visitantes
                  </p>

                  <h2
                    class="mt-1 text-2xl font-black text-blue-950"
                  >
                    Comentarios

                    <span
                      id="rating-count"
                      class="text-base font-semibold text-slate-400"
                    >
                      (0 reseñas)
                    </span>
                  </h2>
                </section>

                <button
                  id="read-commentaries"
                  type="button"
                  class="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                >
                  Escribir comentario
                </button>

              </header>

              <section
                id="commentaries-container"
                class="grid grid-cols-1 gap-4 md:grid-cols-2"
                aria-live="polite"
              >
                <!-- Aquí se renderizan los comentarios -->
              </section>

            </article>

          </section>

          <!-- =================================================
               PANEL LATERAL
          ================================================== -->
          <aside class="min-w-0 space-y-6">

            <article
              class="overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-xl lg:sticky lg:top-28"
            >

              <header
                class="bg-gradient-to-br from-blue-950 via-blue-900 to-purple-700 px-6 py-6 text-white"
              >
                <p
                  class="text-xs font-black uppercase tracking-[0.16em] text-purple-200"
                >
                  Información rápida
                </p>

                <h2 class="mt-1 text-xl font-black">
                  Información del lugar
                </h2>
              </header>

              <section class="p-6">

                <ul class="space-y-5 text-sm text-slate-600">

                  <li class="flex items-start gap-3">

                    <span
                      class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600"
                      aria-hidden="true"
                    >
                      ${renderIconSvg(MapPin, { class: "size-5", strokeWidth: 2 })}
                    </span>

                    <p class="pt-1">
                      <strong class="block text-blue-950">
                        Dirección
                      </strong>

                      ${placeDetail.address || "Dirección no disponible"}
                    </p>

                  </li>

                  <li class="flex items-start gap-3">

                    <span
                      class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                      aria-hidden="true"
                    >
                      ${renderIconSvg(Compass, { class: "size-5", strokeWidth: 2 })}
                    </span>

                    <p class="pt-1">
                      <strong class="block text-blue-950">
                        Tipo
                      </strong>

                      Lugar turístico
                    </p>

                  </li>

                  <li class="flex items-start gap-3">

                    <span
                      class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
                      aria-hidden="true"
                    >
                      ${renderIconSvg(placeDetail.is_active ? Check : X, { class: "size-5", strokeWidth: 2 })}
                    </span>

                    <p class="pt-1">
                      <strong class="block text-blue-950">
                        Disponibilidad
                      </strong>

                      ${placeDetail.is_active ? "Disponible" : "No disponible"}
                    </p>

                  </li>

                </ul>

              </section>

              <footer
                class="space-y-3 border-t border-slate-100 bg-slate-50/60 p-6"
              >

                <button
                  id="btn-add-place"
                  type="button"
                  class="h-12 w-full rounded-xl bg-blue-950 font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
                >
                  Agregar a mi itinerario
                </button>

                <button
                  id="btn-view-place-location"
                  type="button"
                  class="h-12 w-full rounded-xl border border-purple-600 font-bold text-purple-600 transition hover:bg-purple-50"
                >
                  Ver ubicación
                </button>

              

              </footer>

            </article>

          </aside>

        </section>

      </section>

    </main>
  `;
    } catch (error) {
        alert("No se pudo cargar el lugar")
        return `
        ${renderMainNavigation()}

        <main class="min-h-screen bg-slate-50 px-6 py-16 text-center">
            <h1 class="text-2xl font-black text-blue-950">
                No se pudo cargar el lugar
            </h1>

            <p class="mt-3 text-slate-600">
                ${error.message}
            </p>
        </main>
    `
    }

}

export function placeDetailEvents(){
    initializeMainNavigationEvents();

    if (!currentPlace) return;
}
