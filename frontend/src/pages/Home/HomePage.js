import { renderMainNavigation, initializeMainNavigationEvents } from "../../components/layout/MainNavigation.js";
import {
  renderFeaturedEventCard,
  renderHomeInfoIcon,
  renderHomeFeatureCard,
} from "../../components/sections/HomeSections.js";
import {
  getEventosDestacados,
  getSitiosDestacados,
} from "../../services/featuredContentService.js";
import { renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";

export function renderHomePage() {
  return `
    ${renderMainNavigation()}
    


        <main class="w-full flex flex-col gap-4 font-sans">
      <section class="HERO w-full h-120 relative">
        <img
          class="w-full h-full object-cover"
          src="/src/assets/images/hero3.png"
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

      <section
        class="SITIOSYEVENTOSDESTACADOS pl-10 pr-10 items-stretch grid grid-cols-1 xl:grid-cols-2 gap-4"
      >
        <aside class="IZQUIERDO-SITIOSDESTACADOS">
          <section class="flex gap-2 items-center h-10">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700"
            >
              <img
                class="h-5 w-5"
                src="/src/assets/icons/location.svg"
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
                src="/src/assets/icons/calendar.svg"
                alt="Icono de eventos destacados"
              />
            </div>
            <h2 class="text-2xl font-bold text-red-500">Eventos Destacados</h2>
          </section>

          <figure
            id="eventos-destacados"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2"
          >
            ${renderFeaturedEventCard()}
          </figure>
        </aside>
      </section>

      <section
        class="INFOICONS max-w-full p-2 ml-10 mr-10 bg-gray-50 border border-gray-200 rounded-3xl text-blue-900 font-medium text-sm"
      >
        <h2 class="font-medium text-2xl text-blue-900 pl-5">
          ¿Por qué usar Barranquilla explora?
        </h2>

        <figure
          class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 p-2"
        >
          ${renderHomeInfoIcon("places.svg", "Descubre lugares icónicos y también menos visibles.", "bg-blue-600")} 
          ${renderHomeInfoIcon("music.svg", "Consulta eventos culturales, gastronómicos y deportivos.", "bg-red-500")} 
          ${renderHomeInfoIcon("safe.svg", "Encuentra información confiable y actualizada","bg-yellow-500")}
          ${renderHomeInfoIcon("heart.svg", "Planifica y guarda tus itinerarios.","bg-green-500")} 
          ${renderHomeInfoIcon("people.svg", "Conecta con experiencias locales auténticas y memorables.", "bg-purple-500")}
          ${renderHomeInfoIcon("shop.svg", "Impulsa el turismo local y la visibilidad de emprendimientos.", "bg-orange-500")}
        </figure>
      </section>

      <section
        class="INFOICONS2 max-w-full ml-8 mr-8 text-blue-900 font-medium text-sm"
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
        class="text-blue-900 font-medium xl:text-2xl p-2 ml-10 mr-10 flex justify-center"
      >
        <img
          class="w-16 mb-4"
          src="/src/assets/images/chispitas2.png"
          alt="Icono de corazón"
        />
        <p>
          Barranquilla te espera.&nbsp;
          <b> Explora, vive <span class="text-red-600"> y comparte</span> </b>
          lo mejor de nuestra ciudad.
        </p>
        <img
          class="w-16 mb-4"
          src="/src/assets/images/chispitas_derecho.png"
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

  // Funcionalidad para mostrar los destacados de sitios y eventos en la página de inicio
  const sitiosContainer = document.getElementById("sitios-destacados");
  const eventosContainer = document.getElementById("eventos-destacados");

  try {
    const sitios = await getSitiosDestacados();
    if (sitios) {
      sitiosContainer.innerHTML = sitios.map(sitio => renderTouristPlaceCard(sitio)).join("");
    }
  } catch (error) {
    alert(error.message);
  }

  try {
    const eventos = await getEventosDestacados();
    if (eventos) {
      eventosContainer.innerHTML = eventos.map(evento => renderFeaturedEventCard(evento)).join("");
    }
  } catch (error) {
    alert(error.message);
  }

  // FIN
}
