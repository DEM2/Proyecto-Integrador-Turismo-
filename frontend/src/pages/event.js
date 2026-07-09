import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.js";

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
    
      <figure class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 p-2">

          <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full relative bottom-75">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-blue-600"
            >
              <img
                src="/src/assets/img/places.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <p>
              Descubre lugares icónicos y también menos visibles.
            </p>
          </article>

         <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full relative bottom-75">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-red-500"
            >
              <img
                src="/src/assets/img/music.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Consulta eventos culturales, gastronómicos y deportivos.
            </p>
          </article>


          <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full relative bottom-75">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-yellow-500 "
            >
              <img
                src="/src/assets/img/safe.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Encuentra información confiable y actualizada.
            </p>
          </article>


          <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200  hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-green-500"
            >
              <img
                src="/src/assets/img/heart.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Planifica y guarda tus itinerarios.
            </p>
          </article>


          <article class="flex items-center gap-3  bg-white  p-5 rounded-3xl shadow-lg shadow-gray-200  hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-purple-500"
            >
              <img
                src="/src/assets/img/people.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Conecta con experiencias locales auténticas y memorables.
            </p>
          </article>


          <article class="flex items-center gap-3 top-3 bg-white  p-5 rounded-3xl shadow-lg shadow-gray-200  hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-orange-500"
            >
              <img
                src="/src/assets/img/shop.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Impulsa el turismo local y la visibilidad de emprendimientos.
            </p>
            
          </article>

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
