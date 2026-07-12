import { navigateTo } from "../router/router";
import { NAV_BAR,NavbarEvents } from "../components/nav_bar.component.js";
import { filterCard } from "../components/filterCard.component.js";
import { CALENDAR } from "../components/calendar.component.js";
import { EVENTOS_DESTACADOS } from "../components/home.component.js";
import { getEventosDestacados } from "../services/destacados.service.js";
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

export function event() {
  return `
    ${NAV_BAR()}

    <main class="w-full flex flex-col font-sans bg-slate-50">

      <!-- HERO -->
      <section class="relative">
        <header class="relative h-72 overflow-hidden">
          <img
            src="/src/assets/img/Rueda_Hero.png"
            alt="Hero"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <div class="absolute inset-0 bg-linear-to-r from-white via-white/30 to-transparent"></div>

          <div class="absolute left-10 top-12 text-blue-950">
            <div class="w-12 h-1 bg-yellow-400 rounded-full mb-6"></div>

            <h1 class="text-6xl font-bold mb-4">
              Eventos en Barranquilla
            </h1>

            <p class="text-xl text-slate-700">
              Descubre todos los eventos, festivales y actividades
              <br>
              que hacen vibrar a nuestra ciudad.
            </p>
          </div>
        </header>
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
                src="/src/assets/img/location.svg"
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

        <!-- CALENDARIO -->
        <aside>

          <div
            class="rounded-3xl bg-white shadow-xl border border-slate-200 p-6 stickytop-6">
            ${CALENDAR()}

          </div>

        </aside>

      </section>

    </main>
  `;
}

export async function eventEvents() {
  
    NavbarEvents()
   
      
 try {
    const eventosContainer = document.getElementById("eventos-destacados");
    const eventos = await getEventosDestacados();
    if (eventos) {   
      eventosContainer.innerHTML = eventos.map(evento => EVENTOS_DESTACADOS(evento)).join("");
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

    filters_container.innerHTML = categories
        .map(category => filterCard(category))
        .join("");

}
    

