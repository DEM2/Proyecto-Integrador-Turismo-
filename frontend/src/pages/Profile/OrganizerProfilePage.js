import {
  renderMainNavigation,
  initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { createFollowButton } from "../../components/buttons/FollowButton.js";
import { getSession } from "../../services/authService.js";
import { countReviewsOrganizador, getReviewsOrganizador } from "../../services/reviews.service.js";
import { renderReviewCardOrganizador } from "../../components/cards/ReviewCardOrganizador.js";

export function renderOrganizerProfilePage() {
  return `
  ${renderMainNavigation()}

  
 <main class="min-h-screen  text-blue-950 font-sans bg-gray-50">

  <!-- ENCABEZADO DEL PERFIL -->
  <section
    class="relative"
  >

    <!-- Imagen de portada -->
    <figure class="absolute inset-x-0 top-0 h-128 overflow-hidden sm:h-120 md:h-75">
      <img
        src="/src/assets/images/hero3.png"
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
          src="/src/assets/images/familias.webp"
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
            src="/src/assets/images/explorer_morado.png"
            alt=""
            class="size-15 object-contain "
          />
        </div>
      </figure>

      <!-- Datos del perfil -->
      <section class="max-w-xl" >

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
            class="cursor-pointer rounded-full bg-purple-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-purple-600"
          >
            Seguir
          </button>
        </section>

        <p id="user-name" class="mt-1 text-sm font-semibold sm:text-base">
          @Matero123_sew
        </p>

        <p id="description" class="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:mt-4 sm:text-sm md:mx-0">
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
                  src="/src/assets/icons/instagram.svg"
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
                  src="/src/assets/icons/tiktok.svg"
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
                  src="/src/assets/icons/facebook.svg"
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
      <ul class="grid grid-cols-2 md:grid-cols-5">

        <!-- Seguidores -->
        <li class="border-b border-r border-slate-200 md:border-b-0">
          <button
            type="button"
            data-profile-section="followers"
            class="flex min-h-28 w-full cursor-pointer items-center justify-center gap-4 p-4 transition hover:bg-slate-50"
          >
            <img
              src="/src/assets/icons/seguidores_morado.svg"
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
              src="/src/assets/icons/seguidos_morado.svg"
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
              src="/src/assets/icons/reseñas.svg"
              alt=""
              class="size-10"
              aria-hidden="true"
            />

            <span>
              <strong id="treview" class="block text-2xl font-black text-blue-950">
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
              src="/src/assets/icons/location4.svg"
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
              src="/src/assets/icons/calendar2.svg"
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

  <!-- CONTENIDO DEL PERFIL -->
  <section
    id="profile-content"
    class="mx-auto mt-20 max-w-7xl space-y-12 px-6 pb-16"
    aria-live="polite"
  >

    <!-- EVENTOS CREADOS -->
    <section aria-labelledby="created-events-title">

      <header class="mb-6 flex items-center justify-between">
        <h2
          id="created-events-title"
          class="text-2xl font-black text-blue-950"
        >
          Eventos creados
        </h2>

        <a
          href="/eventos"
          class="cursor-pointer font-bold text-blue-600 hover:underline"
        >
          Ver todos
        </a>
      </header>

      <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <!-- EVENTO 1 -->
        <article
          class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >

          <figure class="relative h-64 overflow-hidden">
            <img
              src="/src/assets/images/hero.png"
              alt="Carnaval de Barranquilla 2025"
              class="h-full w-full object-cover"
            />

            <time
              datetime="2025-02-15"
              class="absolute left-3 top-3 rounded-xl bg-white px-4 py-2 text-center font-black text-blue-950 shadow-md"
            >
              <span class="block text-xl">15</span>
              <span class="block text-sm">FEB</span>
            </time>

          </figure>

          <section class="space-y-4 p-5">
            <header>
              <h3 class="text-xl font-black text-blue-950">
                Carnaval de Barranquilla 2025
              </h3>
            </header>

            <p>
              <span class="rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-500">
                Festival
              </span>
            </p>

            <footer>
              <strong class="text-xl text-red-500">
                Desde $0
              </strong>
            </footer>
          </section>

        </article>

        <!-- EVENTO 2 -->
        <article
          class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >

          <figure class="relative h-64 overflow-hidden">
            <img
              src="/src/assets/images/hero.png"
              alt="Concierto en el Río"
              class="h-full w-full object-cover"
            />

            <time
              datetime="2025-06-22"
              class="absolute left-3 top-3 rounded-xl bg-white px-4 py-2 text-center font-black text-blue-950 shadow-md"
            >
              <span class="block text-xl">22</span>
              <span class="block text-sm">JUN</span>
            </time>

          </figure>

          <section class="space-y-4 p-5">
            <header>
              <h3 class="text-xl font-black text-blue-950">
                Concierto en el Río
              </h3>
            </header>

            <p>
              <span class="rounded-md bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-600">
                Concierto
              </span>
            </p>

            <footer>
              <strong class="text-xl text-blue-600">
                Desde $40.000
              </strong>
            </footer>
          </section>

        </article>

        <!-- EVENTO 3 -->
        <article
          class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >

          <figure class="relative h-64 overflow-hidden">
            <img
              src="/src/assets/images/hero.png"
              alt="Noche de Jazz"
              class="h-full w-full object-cover"
            />

            <time
              datetime="2025-07-05"
              class="absolute left-3 top-3 rounded-xl bg-white px-4 py-2 text-center font-black text-blue-950 shadow-md"
            >
              <span class="block text-xl">05</span>
              <span class="block text-sm">JUL</span>
            </time>

          </figure>

          <section class="space-y-4 p-5">
            <header>
              <h3 class="text-xl font-black text-blue-950">
                Noche de Jazz
              </h3>
            </header>

            <p>
              <span class="rounded-md bg-purple-50 px-2 py-1 text-sm font-semibold text-purple-600">
                Música
              </span>
            </p>

            <footer>
              <strong class="text-xl text-blue-600">
                Desde $35.000
              </strong>
            </footer>
          </section>

        </article>

        <!-- EVENTO 4 -->
        <article
          class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >

          <figure class="relative h-64 overflow-hidden">
            <img
              src="/src/assets/images/hero.png"
              alt="Sabores del Caribe"
              class="h-full w-full object-cover"
            />

            <time
              datetime="2025-07-12"
              class="absolute left-3 top-3 rounded-xl bg-white px-4 py-2 text-center font-black text-blue-950 shadow-md"
            >
              <span class="block text-xl">12</span>
              <span class="block text-sm">JUL</span>
            </time>

          </figure>

          <section class="space-y-4 p-5">
            <header>
              <h3 class="text-xl font-black text-blue-950">
                Sabores del Caribe
              </h3>
            </header>

            <p>
              <span class="rounded-md bg-orange-50 px-2 py-1 text-sm font-semibold text-orange-600">
                Gastronomía
              </span>
            </p>

            <footer>
              <strong class="text-xl text-green-600">
                Entrada libre
              </strong>
            </footer>
          </section>

        </article>

      </section>
    </section>

    <!-- RESEÑAS RECIBIDAS -->
    <section aria-labelledby="received-reviews-title">

      <header class="mb-6 flex items-center justify-between">
      
        <h2
          id="received-reviews-title"
          class="text-2xl font-black text-blue-950"
        >
          Reseñas recibidas
        </h2>
        

        <button
        id="btn-show-more-reviews"
          type="button"
          data-profile-section="reviews"
          class="cursor-pointer font-bold text-blue-600 hover:underline"
        >
          Ver todas
        </button>
      </header>

      <article  id="reviews-container" class="rounded-2xl border border-slate-200 bg-white px-7 shadow-sm">


      </article>
    </section>

  </section>

</main>

  

    `;
}

  export async function initializeOrganizerProfilePageEvents() {
  //Mostrar menú de navegación en versión móvil
  initializeMainNavigationEvents();
  // FIN


  //Hacemos dinamico la informacion del perfil
  const placeholder = document.getElementById("btn-follow");
  placeholder.replaceWith(createFollowButton("purple"));
  const nombreUsuario = document.getElementById("profile-name");
  const username = document.getElementById("user-name");
  const description = document.getElementById("description");

  const sesion = getSession();
  nombreUsuario.innerText = sesion.user.name;
  ((username.innerText = "@"), sesion.user.username);
  description.innerText = sesion.user.description;
  //FINN



  // LAS REVIEWS

  try {
    const reviews = await getReviewsOrganizador(sesion.user.id);
    const totalreviews = await countReviewsOrganizador(sesion.user.id);
    const totalr=totalreviews.data[0].total_reviews;

    
    
    const container = document.getElementById("reviews-container");
    const button = document.getElementById("btn-show-more-reviews");
    const containerTotalR= document.getElementById("treview")
    containerTotalR.innerText= totalr

    container.innerHTML = reviews.data.map(review => renderReviewCardOrganizador(review)).join("");
  
  
    
  } catch (error) {
    console.log(error);
    
  }


}
