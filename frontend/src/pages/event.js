import { navigateTo } from "../router/router";
import { NAV_BAR } from "../components/nav_bar.component.js";
import { EVENT_FILTER } from "../components/event_filter.component.js";
import { CALENDAR } from "../components/calendar.component.js";
import { EVENTOS_DESTACADOS } from "../components/home.component.js";
import { getEventosDestacados } from "../services/destacados.service.js";

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

      <!-- FILTROS -->
      <section class="px-10 py-6">

        <figure
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-4">

          ${EVENT_FILTER("Todos","all_black.svg")}
          ${EVENT_FILTER("Festivales","firework.svg")}
          ${EVENT_FILTER("Conciertos","concert.svg")}
          ${EVENT_FILTER("Cultura","cultura.svg")}
          ${EVENT_FILTER("Deportes","soccer.svg")}
          ${EVENT_FILTER("Gastronomía","food.svg")}
          ${EVENT_FILTER("Ferias","park.svg")}
          ${EVENT_FILTER("Teatro","theater.svg")}
          ${EVENT_FILTER("Infantiles","kids.svg")}

        </figure>

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
    const botonIniciarSesion = document.getElementById("boton_iniciarsesion");
    const botonRegistrarse = document.getElementById("boton_registrarse");
    const navInicio = document.getElementById("nav-inicio");
    const navEventos = document.getElementById("nav-eventos");
    const eventosContainer = document.getElementById("eventos-destacados");

    navInicio.addEventListener("click", () => {
        navigateTo("/");
    });

    botonIniciarSesion.addEventListener("click", () => {
        navigateTo("/login");
    });

    botonRegistrarse.addEventListener("click", () => {
        navigateTo("/register");
    });
    navEventos.addEventListener("click", () => {
        navigateTo("/event");
    });
      
 try {
    const eventos = await getEventosDestacados();
    if (eventos) {   
      eventosContainer.innerHTML = eventos.map(evento => EVENTOS_DESTACADOS(evento)).join("");
    }
  } catch (error) {
    alert(error.message);
  }
    
}
