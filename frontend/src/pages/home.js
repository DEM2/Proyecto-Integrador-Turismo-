import { navigateTo } from "../router/router";
import { NAV_BAR } from "../components/nav_bar.component.js";
import { EVENTOS_DESTACADOS, INFO_ICONS_HOME, INFO_ICONS_HOME2, SITIOS_DESTACADOS } from "../components/home.component.js";
import { getEventosDestacados, getSitiosDestacados } from "../services/destacados.service.js";

export function home() {
  return `
    ${NAV_BAR()}


    <main class="w-full flex flex-col gap-4 font-sans">
      <section class="  HERO      w-full h-120 relative">
        <img
          class="w-full h-full object-cover"
          src="/src/assets/img/hero3.png"
          alt="Hero Image"
        />
        <p class="absolute bottom-1/2 left-1/9 text-blue-950">
          <span class="font-medium text-5xl"> Descubre la magia. </span><br />
          <span class="font-extralight text-lg">
            Explora, vive y disfruta todo lo que <br />
            nuestra ciudad tiene <b>para ti</b>.
          </span>
        </p>
      </section>

      <section class="   IZQUIERDOYDERECHA pl-10 pr-10  items-stretch grid grid-cols-1 xl:grid-cols-2  gap-4">


        <aside class="  IZQUIERDO   ">
        <section class="flex gap-2 items-center h-10">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700">
              <img
                class="h-5 w-5"
                src="/src/assets/img/location.svg"
                alt="Icono de sitios destacados"
              />
              
            </div>
               <h2 class="text-2xl font-bold text-blue-700">
                Sitios Destacados
              </h2>
              
          </section>
          


          <figure class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-4 p-2">

          ${SITIOS_DESTACADOS()}
          ${SITIOS_DESTACADOS()}
          ${SITIOS_DESTACADOS()}

          </figure>

        </aside>

        <aside class="  DERECHA  ">

        <section class="flex gap-2 items-center h-10">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
              <img
                class="h-5 w-5"
                src="/src/assets/img/calendar.svg"
                alt="Icono de eventos destacados"
              />
              
            </div>
               <h2 class="text-2xl font-bold text-red-500">
                Eventos Destacados
              </h2>
              
          </section>


<figure class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-4 p-2">

          ${EVENTOS_DESTACADOS()}
          ${EVENTOS_DESTACADOS()}
          ${EVENTOS_DESTACADOS()}



          

          </figure>
        </aside>
      </section>

      <section
        class="     INFOICONS     max-w-full p-2 ml-10 mr-10 bg-gray-50 border border-gray-200 rounded-3xl text-blue-900 font-medium text-sm"
      >
        <h2 class="font-medium text-2xl text-blue-900 pl-5">
          ¿Por qué usar Barranquilla explora?
        </h2>

        <figure class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 p-2">

        ${INFO_ICONS_HOME("places.svg", "Descubre lugares icónicos y también menos visibles.", "bg-blue-600")}


        ${INFO_ICONS_HOME("music.svg", "Consulta eventos culturales, gastronómicos y deportivos.", "bg-red-500")}
          

        ${INFO_ICONS_HOME("safe.svg", "Encuentra información confiable y actualizada.", "bg-yellow-500")}


        ${INFO_ICONS_HOME("heart.svg", "Planifica y guarda tus itinerarios.", "bg-green-500")}


        ${INFO_ICONS_HOME("people.svg", "Conecta con experiencias locales auténticas y memorables.", "bg-purple-500")}


        ${INFO_ICONS_HOME("shop.svg", "Impulsa el turismo local y la visibilidad de emprendimientos.", "bg-orange-500")}

        </figure>

      </section>







     <section
        class="  INFOICONS2       max-w-full  ml-8 mr-8 text-blue-900 font-medium text-sm"
      >
        
        <figure class="items-stretch grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-2">

        ${INFO_ICONS_HOME2("store.svg", "Apoya negocios locales", "Con cada visita y recomendación impulsas a emprendedores y comercios de nuestra ciudad.", "bg-amber-100", "negocios_locales.webp")}

        ${INFO_ICONS_HOME2("people2.svg", "Reseñas de usuarios", "Conoce opiniones reales de viajeros y locales para tomar mejores decisiones.", "bg-blue-200", "estrella2.png", "object-contain")}
          

        ${INFO_ICONS_HOME2("location2.svg", "Itinerarios sugeridos", "Rutas listas para que disfrutes lo mejor de Barranquilla en poco tiempo.", "bg-green-200", "itinerario.webp")}

        ${INFO_ICONS_HOME2("family.svg", "Experiencias para todos", "Planes para parejas, familia, amigos y aventureros. ¡Tú eliges cómo vivir la ciudad!", "bg-purple-200", "familias.webp")}

        </figure>

      </section>



    <section class="text-blue-900 font-medium xl:text-2xl  p-2 ml-10 mr-10 flex justify-center"> 
        <img class="w-16 mb-4" src="/src/assets/img/chispitas2.png" alt="Icono de corazón" />
        <p>
        Barranquilla te espera.&nbsp; <b> Explora, vive <span class="text-red-600"> y comparte</span> </b> lo mejor de nuestra ciudad.
        </p>
        <img class="w-16 mb-4" src="/src/assets/img/chispitas_derecho.png" alt="Icono de corazón" />
    </section>




    </main>

    <footer></footer>
    `;
}

export async function homeEvents() {


  //Mostrar menú de navegación en versión móvil
  const boton = document.getElementById("boton_menu");
  const navegacion = document.getElementById("navegacion");
  const equis = document.getElementById("boton_equis");

  boton.addEventListener("click", funcionMenu);
  equis.addEventListener("click", funcionMenu);

  function funcionMenu() {
    navegacion.classList.toggle("active");
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navegacion.classList.remove("active");
    }
  });
  //FINNN menú de navegación en versión móvil

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

  // Funcionalidad para mostrar los destacados de sitios y eventos en la página de inicio

  try {
        const response = await getSitiosDestacados();
        if(response){
          alert("Sitios destacados obtenidos exitosamente");
        }
      } catch (error) {
        alert(error.message);
      }

      try {
        const response = await getEventosDestacados();
        if(response){
          alert("Eventos destacados obtenidos exitosamente");
        }
      } catch (error) {
        alert(error.message);
      }


}




