import { navigateTo } from "../router/router.js";
import { NAV_BAR, NavbarEvents } from "../components/nav_bar.component.js";
import { FollowButton } from "../components/btn_seguir.component.js";
import { cardReseña } from "../components/card_reseña.component.js";
import { cadItinerario } from "../components/card_itinerario.component.js";

export function perfilExplorador() {
  return `
  ${NAV_BAR()}

  
  <main class="min-h-screen  text-blue-950 font-sans bg-gray-50">

  <!-- ENCABEZADO DEL PERFIL -->
  <section
    class="relative"
  >

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
      class="relative  mx-auto flex min-h-128 max-w-7xl flex-col items-center justify-start gap-4 px-4 pb-8 pt-6 text-center text-white sm:min-h-120 sm:px-6 sm:pt-8 md:min-h-70 md:flex-row md:items-center md:justify-start md:gap-5 md:text-left"
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
          class="absolute -bottom-2 right-1 flex items-center justify-center rounded-full "
        >
          <img
            src="/src/assets/img/explore2.png"
            alt=""
            class="size-15 object-contain "
          />
        </div>
      </figure>

      <!-- Datos del perfil -->
      <section class="max-w-xl" aria-label="Información del usuario">

        <section class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start">
          <h2
            id="profile-name"
            class="w-full text-2xl font-bold leading-tight sm:w-auto sm:text-3xl md:text-4xl"
          >
            Mateo Mercado
          </h2>

          <button
            type="button"
            id="btn-follow"
            class="cursor-pointer rounded-full bg-green-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-green-600"
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
        <nav class="mt-4 sm:mt-5" aria-label="Redes sociales de Mateo Mercado">
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
      class="relative  mx-auto -mb-10  max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
      aria-label="Estadísticas y contenido del perfil"
    >
      <ul class="grid grid-cols-2 md:grid-cols-4">

        <!-- Seguidores -->
        <li class="border-b border-r border-slate-200 md:border-b-0">
          <button
            type="button"
            data-profile-section="followers"
            class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
          >
            <img
              src="/src/assets/img/seguidores.svg"
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
              src="/src/assets/img/seguidos.svg"
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

        <!-- Itinerarios -->
        <li class="border-t border-slate-200 md:border-r md:border-t-0">
          <button
            type="button"
            data-profile-section="places"
            class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
          >
            <img
              src="/src/assets/img/itinerarios.svg"
              alt=""
              class="size-10"
              aria-hidden="true"
            />

            <span>
              <strong class="block text-2xl font-black text-blue-950">
                18
              </strong>

              <span class="text-sm text-slate-600">
                Itinerarios
              </span>
            </span>
          </button>
        </li>

      </ul>
    </nav>

  </section>

  <!-- CONTENIDO DEL PERFIL -->
  <section
    id="profile-content"
    class="mx-auto mt-20 max-w-7xl space-y-12 px-6 pb-16"
    aria-live="polite"
  >

    <!-- RESEÑAS -->
    <section >

      <header class="mb-6 flex items-center justify-between">
        <h2
          id="created-events-title"
          class="text-2xl font-black text-blue-950"
        >
          Reseñas
        </h2>

        <a
          href="/eventos"
          class="cursor-pointer font-bold text-blue-600 hover:underline"
        >
          Ver todos
        </a>
      </header>

      <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <!-- RESEÑA 1 -->
        <article id="reseñas"
          class="cursor-pointer"
        >
        </article>

      </section>
    </section>

    <!-- ITINERARIOS CREADOS -->
    <section ">

      <header class="mb-6 flex items-center justify-between">
        <h2
          id="received-reviews-title"
          class="text-2xl font-black text-blue-950"
        >
          Itinerarios públicos
        </h2>

        <button
          type="button"
          data-profile-section="reviews"
          class="cursor-pointer font-bold text-blue-600 hover:underline"
        >
          Ver todas
        </button>
      </header>


        <section class="grid grid-cols-1 gap-6 lg:grid-cols-5">

        <!-- ITINERARIO 1 -->
        <article id="itinerarios"
          class="cursor-pointer"
        >
        </article>
      </section>

  </section>

</main>

  

    `;
}

export function perfilExploradorEvents() {

//Mostrar menú de navegación en versión móvil
  NavbarEvents()
  // FIN

  const placeholder = document.getElementById("btn-follow");
  placeholder.replaceWith(FollowButton('green'));


  const reseñasContainer = document.getElementById("reseñas");
  reseñasContainer.innerHTML=cardReseña()

   const itinerariosContainer = document.getElementById("itinerarios");
  itinerariosContainer.innerHTML=cadItinerario()





  /* try {
      const sitios = await getSitiosDestacados();
      if (sitios) {
        sitiosContainer.innerHTML = sitios.map(sitio => SITIOS_DESTACADOS()).join("");
      }
    } catch (error) {
      alert(error.message);
    } */
}
