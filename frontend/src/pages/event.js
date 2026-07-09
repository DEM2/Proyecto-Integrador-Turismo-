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
    
      <figure class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-9 gap-4 p-2">

          ${EVENT_FILTER("Todos")}
          ${EVENT_FILTER("Festivales")}
          ${EVENT_FILTER("Conciertos")}
          ${EVENT_FILTER("Cultura")}
          ${EVENT_FILTER("Deportes")}
          ${EVENT_FILTER("Gastronomía")}
          ${EVENT_FILTER("Ferias")}
          ${EVENT_FILTER("Teatro")}
          ${EVENT_FILTER("Infantiles")}
          

        </figure>
      
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
