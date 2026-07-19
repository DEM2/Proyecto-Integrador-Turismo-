import { createFollowButton } from "../../components/buttons/FollowButton.js";
import { getSession } from "../../services/authService.js";

import { getOrganizerProfileSummary } from "../../services/reviews.service.js";
import { renderIconSvg } from "../../utils/renderIcon.js";
import {
  CalendarDays,
  MapPin,
  Star,
  UserRoundPlus,
  UsersRound,
} from "lucide";

export function renderProfileInfo() {
  return `
 

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
          alt="Foto de perfil del usuario"
          class="size-50 rounded-full border-4 border-white object-cover shadow-xl sm:size-40 md:size-62"
        />

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
          @
        </p>

        <p id="description" class="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:mt-4 sm:text-sm md:mx-0">
          ...
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
                @ 
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
                @ ...
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
                @ ...
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
            ${renderIconSvg(UsersRound, {
              class: "size-9 text-purple-700",
              "stroke-width": 1.8,
              "aria-hidden": "true",
            })}

            <span>
              <strong class="block text-2xl font-black text-blue-950">
                0
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
            ${renderIconSvg(UserRoundPlus, {
              class: "size-9 text-purple-700",
              "stroke-width": 1.8,
              "aria-hidden": "true",
            })}

            <span>
              <strong class="block text-2xl font-black text-blue-950">
                0
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
            ${renderIconSvg(Star, {
              class: "size-9 text-amber-500",
              "stroke-width": 1.8,
              "aria-hidden": "true",
            })}

            <span>
              <strong id="treview" class="block text-2xl font-black text-blue-950">
                0
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
            ${renderIconSvg(MapPin, {
              class: "size-9 text-purple-700",
              "stroke-width": 1.8,
              "aria-hidden": "true",
            })}

            <span>
              <strong id="container-sites" class="block text-2xl font-black text-blue-950">
                0
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
            ${renderIconSvg(CalendarDays, {
              class: "size-9 text-blue-700",
              "stroke-width": 1.8,
              "aria-hidden": "true",
            })}

            <span>
              <strong id="container-events" class="block text-2xl font-black text-blue-950">
                0
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
  `
}

export async function renderProfileInfoEvents(){

    //Hacemos dinámico la información del perfil
      const placeholder = document.getElementById("btn-follow");
      if (placeholder) {
        placeholder.replaceWith(createFollowButton("purple"));
      }
    
      const nombreUsuario = document.getElementById("profile-name");
      const username = document.getElementById("user-name");
      const description = document.getElementById("description");
    
      const sesion = getSession();
      if (sesion?.user) {
        if (nombreUsuario) {
          nombreUsuario.innerText = sesion.user.name.toUpperCase() || "Usuario";
        }
    
        if (username) {
          username.innerText = `@${sesion.user.name || ""}`;
        }
    
        if (description) {
          description.innerText = sesion.user.description || "Sin descripción disponible.";
        }
      }
      //FIN
    
      const containerTotalR = document.getElementById("treview");
      const containersites = document.getElementById("container-sites");
      const containerevents = document.getElementById("container-events");
      let profileData = {
        counts: {
          reviews: 0,
          sites: 0,
          events: 0,
        },
        events: [],
      };
    
      if (sesion?.user) {
        try {
          profileData = await getOrganizerProfileSummary(sesion.user.id, 4);

          if (containerTotalR) {
            containerTotalR.innerText = profileData?.counts?.reviews ?? 0;
          }

          if (containersites) {
            containersites.innerText = profileData?.counts?.sites ?? 0;
          }

          if (containerevents) {
            containerevents.innerText = profileData?.counts?.events ?? 0;
          }
        } catch (error) {
          console.error("No se pudo cargar el perfil del organizador:", error);
          if (containerTotalR) {
            containerTotalR.innerText = "0";
          }
          if (containersites) {
            containersites.innerText = "0";
          }
          if (containerevents) {
            containerevents.innerText = "0";
          }
        }
      }
    
      return profileData;
}
