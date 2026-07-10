import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.component.js";
import { EVENT_FILTER } from "../components/event_filter.component.js";

export function event() {
    return `
  ${NAV_BAR()}
    <main class="w-full flex flex-col gap-4 font-sans ">
      <section class="w-full flex flex-col gap-4 font-sans ">
      <header class="  HERO w-full h-120 relative">
        <img
          class="absolute w-full h-50 object-center object-cover top-0.5 "
          src="/src/assets/img/Rueda_Hero.png"
          alt="Hero Image"
        />
        <p class="absolute top-8 left-6 text-blue-950">
          <span class="font-medium text-5xl"> Eventos En Barranquilla. </span><br />
          <span class="font-extralight text-lg mb-2">
          <br />
            Descubre todos los eventos, festivales  actividades <br />
            que hacen vibrar a nuestra ciudad. 
          </span>
        </p>
      </header>
      </section>
    
      <figure class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-10 gap-4 p-2">

          ${EVENT_FILTER("Todos","all_black.svg")}
          ${EVENT_FILTER("Festivales")}
          ${EVENT_FILTER("Conciertos")}
          ${EVENT_FILTER("Cultura")}
          ${EVENT_FILTER("Deportes")}
          ${EVENT_FILTER("Gastronomía")}
          ${EVENT_FILTER("Ferias")}
          ${EVENT_FILTER("Teatro")}
          ${EVENT_FILTER("Infantiles")}
          ${EVENT_FILTER("Otros")}

        </figure>

    <section
      class="SITIOSYEVENTOSDESTACADOS pl-10 pr-10 items-stretch grid grid-cols-1 xl:grid-cols-2 gap-4 relative bottom-60"
      >
      <aside class="IZQUIERDO-SITIOSDESTACADOS">
          <section class="flex gap-2 items-center h-10">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700"
            >
              <img
                class="h-5 w-5"
                src="/src/assets/img/location.svg"
                alt="Icono de sitios destacados"
              />
            </div>
            <h2 class="text-2xl font-bold text-blue-700">Sitios Destacados</h2>
          </section>

          <figure
            id="sitios-destacados"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2"
          >
          </figure>
        </aside>
        
          <aside class="DERECHA-EVENTOSDESTACADOS">
          <section class="flex gap-2 items-center h-10">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-red-500"
            >
              <img
                class="h-5 w-5"
                src="/src/assets/img/calendar.svg"
                alt="Icono de eventos destacados"
              />
            </div>
            <h2 class="text-2xl font-bold text-red-500">Eventos Destacados</h2>
    </section>
      
    </main>

      

     
    `;
}

export function eventEvents() {
    const botonIniciarSesion = document.getElementById("boton_iniciarsesion");
    const botonRegistrarse = document.getElementById("boton_registrarse");
    const navInicio = document.getElementById("nav-inicio");
    const navEventos = document.getElementById("nav-eventos");

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
}
