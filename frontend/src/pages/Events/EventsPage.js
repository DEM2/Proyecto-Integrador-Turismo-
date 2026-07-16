import { renderMainNavigation,initializeMainNavigationEvents } from "../../components/layout/MainNavigation.js";
import { renderCategoryFilterCard } from "../../components/cards/CategoryFilterCard.js";
import { renderEventCalendar } from "../../components/common/EventCalendar.js";
import { renderFeaturedEventCard } from "../../components/sections/HomeSections.js";
import { getEventosDestacados } from "../../services/featuredContentService.js";
import { navigateTo } from "../../router/AppRouter.js";
import {
    House,
    CalendarDays,
    Music,
    Landmark,
    Trophy,
    UtensilsCrossed,
    Store,
    Drama,
    Baby
} from "lucide";

export function renderEventsPage() {
  return `
    ${renderMainNavigation()}

    <main class="w-full flex flex-col font-sans bg-slate-50">

    <!-- HERO -->
<section class="relative overflow-hidden bg-white" aria-labelledby="hero-title">

  <div class="relative h-[420px]">

   <!-- Capa de fondo: imagen + degradado -->
<div class="absolute inset-0 z-0" aria-hidden="true">
  <img
    src="/src/assets/images/ff.jpg"
    alt=""
    class="absolute inset-0 h-full w-full object-cover"
  />
  <div
    class="absolute inset-0 bg-gradient-to-r
    from-white
    via-white/95
    via-30%
    to-70%">
  </div>
</div>

    <!-- Círculo decorativo -->
    <div
      class="absolute right-32 top-16
      w-72 h-72
      rounded-full
      bg-blue-600/15
      blur-3xl
      z-10"
      aria-hidden="true">
    </div>

    <!-- Olas decorativas (fondo, detrás del texto) -->
    <div class="absolute inset-0 z-10" aria-hidden="true">

      <!-- Ola amarilla transparente (solo lado derecho) -->
      <svg
        class="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none">
        <path
          fill="#fa2c15"
          fill-opacity="0.35"
          d="M850,220
             C1000,40
             1250,220
             1440,30
             L1440,220
             L850,220
             Z"/>
      </svg>

      <!-- Ola blanca -->
      <svg
        class="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 170"
        preserveAspectRatio="none">
        <path
          fill="white"
          d="M0,140
             C250,20
             450,240
             720,130
             C980,20
             1190,170
             1440,90
             L1440,170
             L0,170
             Z"/>
      </svg>

    </div>

    <!-- Contenido: texto principal (siempre por encima de olas) -->
    <div
      class="absolute
      left-12
      top-1/2
      -translate-y-1/2
      z-20
      max-w-xl">

      <div class="w-14 h-1 bg-yellow-400 rounded-full mb-8" aria-hidden="true"></div>

      <h1
        id="hero-title"
        class="text-6xl
        font-extrabold
        leading-tight
        text-blue-950">
        Eventos que <br>
        hacen vibrar <br>
        Barranquilla
      </h1>

      <p
        class="mt-6
        text-xl
        leading-8
        text-slate-600">
        Conciertos, festivales, ferias y actividades
        para disfrutar lo mejor de nuestra ciudad.
      </p>

    </div>

  </div>

</section>

         <!-- Categorías -->
            <section
              id="filters_container"
              class="mt-6 mb-8 flex justify-center gap-4  px-10">
            </section>


      <!-- CONTENIDO -->
      <section
        class="px-10 pt-8 pb-10 grid grid-cols-1 xl:grid-cols-[2fr_420px] gap-10">
        <!-- EVENTOS -->
        <aside>

          <section class="flex items-center gap-3 mb-6">

            <div
              class="w-8 h-8 rounded-full bg-blue-700 flex justify-center items-center">

              <img
                src="/src/assets/icons/location.svg"
                class="w-5 h-5"
              />

            </div>

            <h2 class="text-3xl font-bold text-blue-700">
              Eventos Destacados
            </h2>

          </section>

         <figure
          id="eventos-destacados"
          class="grid
           grid-cols-1
           sm:grid-cols-2
           lg:grid-cols-3
           gap-6">

          </figure>

        </aside>

        <!-- renderEventCalendarIO -->
        <aside>

          <div
            class="rounded-3xl bg-white shadow-xl border border-slate-200 p-6 stickytop-6">
            ${renderEventCalendar()}

          </div>

        </aside>

      </section>

    </main>
  `;
}

export async function initializeEventsPageEvents() {
  
    initializeMainNavigationEvents()
   
      
  try {

      const eventosContainer = document.getElementById("eventos-destacados");

      const eventos = await getEventosDestacados();

      if (eventos) {

          eventosContainer.innerHTML = eventos
              .map(evento => renderFeaturedEventCard(evento))
              .join("");

          document
              .querySelectorAll(".featured-event-card")
              .forEach((card) => {

                  card.addEventListener("click", () => {
                  console.log("Click");
                  const id = card.dataset.eventId;

                  console.log("ID seleccionado:", id);

                  localStorage.setItem("selectedEventId", id);

                  console.log("Guardado:", localStorage.getItem("selectedEventId"));

                  navigateTo("/detailEvent");


                  });

              });

      }

  } catch (error) {
      alert(error.message);
  }
 const categories = [

    {
        name: "Todos",
        description: "Explora todos los eventos",
        icon: House,
        color: "bg-blue-600"
    },

    {
        name: "Festival",
        description: "Celebraciones y festivales",
        icon: CalendarDays,
        color: "bg-red-500"
    },

    {
        name: "Concierto",
        description: "Música en vivo",
        icon: Music,
        color: "bg-purple-500"
    },

    {
        name: "Cultura",
        description: "Arte y patrimonio",
        icon: Landmark,
        color: "bg-pink-500"
    },

    {
        name: "Deportes",
        description: "Eventos deportivos",
        icon: Trophy,
        color: "bg-green-600"
    },

    {
        name: "Gastronomía",
        description: "Sabores del Caribe",
        icon: UtensilsCrossed,
        color: "bg-orange-500"
    },

    {
        name: "Feria",
        description: "Exposiciones y negocios",
        icon: Store,
        color: "bg-cyan-500"
    },

    {
        name: "Teatro",
        description: "Obras y espectáculos",
        icon: Drama,
        color: "bg-indigo-500"
    },

    {
        name: "Infantil",
        description: "Diversión para niños",
        icon: Baby,
        color: "bg-yellow-500"
    }

];

    const filtersContainer = document.getElementById("filters_container");

    filtersContainer.innerHTML = categories
        .map(category => renderCategoryFilterCard(category))
        .join("");

}


    

