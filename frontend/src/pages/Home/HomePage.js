import { renderMainNavigation, initializeMainNavigationEvents } from "../../components/layout/MainNavigation.js";
import { renderHomeInfoIcon, renderHomeFeatureCard} from "../../components/sections/HomeSections.js";
import { getEventosDestacados, getSitiosDestacados} from "../../services/featuredContentService.js";
import { navigateTo } from "../../router/AppRouter.js";
import { renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";
import { renderEventCard } from "../../components/cards/EventCard.component.js";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { ArrowRight, CalendarDays, MapPin, MapPinned, Sparkles,Signpost, Music4, ShieldCheck, HeartPlus, Users, Store } from "lucide";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import ventanaMundo from "../../assets/videos/ventana_mundo.mp4";
import { alertaError } from "../../utils/alerts.js";


export function renderHomePage() {
  return `
    ${renderMainNavigation()}

    <main class="home-page flex w-full flex-col gap-4 font-sans max-md:gap-5">
      <section class="HERO relative isolate flex min-h-[38rem] w-full flex-col overflow-hidden bg-blue-950 max-md:h-[260px] sm:min-h-[40rem] lg:min-h-[42rem]">
         <video class="absolute inset-0 block w-full h-full object-cover" autoplay muted loop playsinline >
                        <source src="${ventanaMundo}" type="video/mp4" />
                        </video>
        

        <div class="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/65 to-blue-950/10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-blue-950/15"></div>

        <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-10 sm:px-10 sm:py-16 lg:px-12">
          <div class="max-w-2xl">
            <p class="mb-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:mb-5 sm:px-4 sm:text-sm sm:tracking-[0.18em]">
              ${renderIconSvg(Sparkles, {
                class: "size-4 text-amber-300",
                strokeWidth: 2,
              })}
              La puerta de oro de Colombia
            </p>

            <h1 class="mb-8 flex max-w-xl flex-col gap-2 text-4xl font-black leading-[1.2] tracking-tight text-white drop-shadow-lg sm:mb-0 sm:block sm:text-6xl sm:leading-[1.05] lg:text-7xl">
              <span class="block">Barranquilla</span>
              <span class="block text-amber-300 sm:mt-2">no se visita.</span>
              <span class="block">Se vive.</span>
            </h1>

            <p class="max-w-lg text-sm leading-6 text-white/85 sm:mt-6 sm:max-w-xl sm:text-lg sm:leading-relaxed lg:text-xl">
              Descubre lugares con historia, eventos llenos de ritmo y experiencias que solo suceden en una ciudad que siempre tiene algo que celebrar.
            </p>

            <div class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <button
                id="hero-explore-places"
                type="button"
                class="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-black text-blue-950 shadow-xl shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
              >
                Explorar lugares
                ${renderIconSvg(ArrowRight, {
                  class: "size-5 transition-transform group-hover:translate-x-1",
                  strokeWidth: 2.3,
                })}
              </button>

              <button
                id="hero-explore-events"
                type="button"
                class="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
              >
                ${renderIconSvg(CalendarDays, {
                  class: "size-5",
                  strokeWidth: 2.2,
                })}
                Ver próximos eventos
              </button>
            </div>
          </div>
        </div>

        <div class="relative z-20 hidden shrink-0 border-t border-white/15 bg-blue-950/70 backdrop-blur-xl md:block">
          <div class="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/15 px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
            <div class="flex items-center gap-3 py-4 md:px-5">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                ${renderIconSvg(MapPin, { class: "size-5", strokeWidth: 2.2 })}
              </span>
              <p class="text-sm text-white/70"><strong class="block text-white">Rincones únicos</strong>Lugares con historia y sabor local</p>
            </div>

            <div class="hidden items-center gap-3 py-4 md:flex md:px-5">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-400/15 text-rose-300">
                ${renderIconSvg(CalendarDays, { class: "size-5", strokeWidth: 2.2 })}
              </span>
              <p class="text-sm text-white/70"><strong class="block text-white">Agenda viva</strong>Cultura, música y tradición</p>
            </div>

            <div class="hidden items-center gap-3 py-4 md:flex md:px-5">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                ${renderIconSvg(Sparkles, { class: "size-5", strokeWidth: 2.2 })}
              </span>
              <p class="text-sm text-white/70"><strong class="block text-white">Experiencias locales</strong>Planes para vivir la ciudad de verdad</p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="SITIOSYEVENTOSDESTACADOS mt-6 grid grid-cols-1 items-stretch gap-4 px-10 max-md:gap-6 max-md:px-[14px] md:max-lg:px-8 xl:grid-cols-2"
      >
        <aside class="IZQUIERDO-SITIOSDESTACADOS">
          <section  class="flex items-center  gap-2 mb-5 ">
            ${renderIconSvg(MapPinned, {
              class: "size-6 text-blue-500",
              strokeWidth: 2,
            })}
            <div>
              <p class="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Explora
              </p>
              <h2 class="text-2xl font-bold text-blue-700 max-md:text-2xl">Lugares destacados</h2>
            </div>
          </section>

          <figure
            id="sitios-destacados"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2"
          >
          </figure>
        </aside>

        <aside class="DERECHA-EVENTOSDESTACADOS">
          <section class="flex items-center gap-2 mb-4">
            ${renderIconSvg(CalendarDays, {
              class: "size-6 text-red-500",
              strokeWidth: 2,
            })}
            <div>
              <p class="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Explora
              </p>
              <h2 class="text-2xl font-bold text-red-500 max-md:text-2xl">Eventos destacados</h2>
            </div>
          </section>

          <figure
            id="eventos-destacados"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2"
          >
          </figure>
        </aside>
      </section>

      <section
        class="INFOICONS mx-10 max-w-full rounded-3xl border border-gray-200 bg-gray-50 p-2 text-sm font-medium text-blue-900 max-md:mx-[14px]"
      >
        <h2 class="pl-5 text-2xl font-medium text-blue-900 max-md:pl-3 max-md:text-xl">
          ¿Por qué usar Barranquilla explora?
        </h2>

        <figure
          class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 p-2"
        >
          ${renderHomeInfoIcon(Signpost, "Descubre lugares icónicos y también menos visibles.", "bg-blue-600")} 
          ${renderHomeInfoIcon(Music4, "Consulta eventos culturales, gastronómicos y deportivos.", "bg-red-500")} 
          ${renderHomeInfoIcon(ShieldCheck, "Encuentra información confiable y actualizada","bg-yellow-500")}
          ${renderHomeInfoIcon(HeartPlus, "Planifica y guarda tus itinerarios.","bg-green-500")} 
          ${renderHomeInfoIcon(Users, "Conecta con experiencias locales auténticas y memorables.", "bg-purple-500")}
          ${renderHomeInfoIcon(Store, "Impulsa el turismo local y la visibilidad de emprendimientos.", "bg-orange-500")}
        </figure>
      </section>

      <section
        class="INFOICONS2 mx-8 max-w-full text-sm font-medium text-blue-900 max-md:mx-[14px]"
      >
        <figure
          class="items-stretch grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-2"
        >
          ${renderHomeFeatureCard("store.svg", "Apoya negocios locales", "Con cada visita y recomendación impulsas a emprendedores y comercios de nuestra ciudad.", "bg-amber-100", "negocios_locales.webp")}
          ${renderHomeFeatureCard("people2.svg", "Reseñas de usuarios", "Conoce opiniones reales de viajeros y locales para tomar mejores decisiones.", "bg-blue-200", "estrella2.png", "object-contain")}
          ${renderHomeFeatureCard("location2.svg", "Itinerarios sugeridos", "Rutas listas para que disfrutes lo mejor de Barranquilla en poco tiempo.",
          "bg-green-200", "itinerario.webp")} 
          ${renderHomeFeatureCard("family.svg","Experiencias para todos", "Planes para parejas, familia, amigos y aventureros. ¡Tú eliges cómo vivir la ciudad!","bg-purple-200","familias.webp")}
        </figure>
      </section>

      <section
        class="mx-10 flex justify-center p-2 font-medium text-blue-900 max-md:mx-[14px] max-md:text-center xl:text-2xl"
      >
        <img
          class="mb-4 w-16 max-md:hidden"
          src="/images/chispitas2.png"
          alt="Icono de corazón"
        />
        <p>
          Barranquilla te espera.&nbsp;
          <b> Explora, vive <span class="text-red-600"> y comparte</span> </b>
          lo mejor de nuestra ciudad.
        </p>
        <img
          class="mb-4 w-16 max-md:hidden"
          src="/images/chispitas_derecho.png"
          alt="Icono de corazón"
        />
      </section>
    </main>

    <footer></footer>

    
    `;
}

export async function initializeHomePageEvents() {
  //Mostrar menú de navegación en versión móvil
    // Funcionalidad de navegación entre páginas
  initializeMainNavigationEvents()
  // FIN

  const explorePlacesButton = document.getElementById("hero-explore-places");
  const exploreEventsButton = document.getElementById("hero-explore-events");

  explorePlacesButton?.addEventListener("click", () => {
    navigateTo("/destinos");
  });

  exploreEventsButton?.addEventListener("click", () => {
    navigateTo("/event");
  });

  // Funcionalidad para mostrar los destacados de sitios y eventos en la página de inicio
  const sitiosContainer = document.getElementById("sitios-destacados");
  const eventosContainer = document.getElementById("eventos-destacados");

  try {
    const sitios = await getSitiosDestacados();
    if (sitios) {
      sitiosContainer.innerHTML = sitios.map(sitio => renderTouristPlaceCard(sitio)).join("");

      sitiosContainer.querySelectorAll(".tourist-place-card").forEach((card) => {
        card.addEventListener("click", (event) => {
          if (event.target.closest(".options-toggle-btn")) return;

          const placeId = card.dataset.placeId;

          if (!placeId) {
            alertaError("No se pudo abrir la información del lugar");
            return;
          }

          localStorage.setItem("selectedPlaceId", placeId);
          navigateTo("/detailPlace");
        });
      });
    }
  } catch (error) {
    alertaError(error.message);
  }

  try {
    const eventos = await getEventosDestacados();
    if (eventos) {
      eventosContainer.innerHTML = eventos
        .map(evento => renderEventCard(evento))
        .join("");

      document.querySelectorAll(".featured-event-card")
        .forEach((card) => {
          card.addEventListener("click", () => {
            const id = card.dataset.eventId;
            localStorage.setItem("selectedEventId", id);
            navigateTo("/detailEvent");
          });
        });
    }
  } catch (error) {
    alertaError(error.message);
  }

  initializeItineraryMenus();

  // FIN
}
