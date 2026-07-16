import {
  renderMainNavigation,
  initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { renderReviewCardOrganizador } from "../../components/cards/ReviewCardOrganizador.js";
import { renderProfileInfo, renderProfileInfoEvents } from "./renderprofileorganizador.js";
import { navigateTo } from "../../router/AppRouter.js";

export function renderOrganizerProfilePage() {
  return `
  ${renderMainNavigation()}

  
<main class="min-h-screen  text-blue-950 font-sans bg-gray-50">
 ${renderProfileInfo()}

  <!-- CONTENIDO DEL PERFIL -->
  <section
    id="profile-content"
    class="mx-auto mt-20 max-w-7xl space-y-12 px-6 pb-16"
    aria-live="polite"
  >

    <!-- EVENTOS CREADOS -->
    <section aria-labelledby="created-events-title">

      <header class="mb-6 flex items-center justify-between">

      
        <h2
          id="created-events-title"
          class="text-2xl font-black text-blue-950"
        >
          Eventos creados
        </h2>
        
        <div  class="flex flex-col text-center gap-1">
        <a
          href="/eventos"
          class="cursor-pointer font-bold text-blue-600 hover:underline"
        >
          Ver todos
        </a>
        <button
          id="btn-create-event"
          type="button"
          data-organizer-view="create-event"
          class="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-6 py-3 font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900 cursor-pointer"
        >
          <span aria-hidden="true">＋</span>
          Crear evento
        </button>
        </div>
        
      </header>

      <section id="Eventos-container" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <!-- EVENTOS -->
      </section>
    </section>

    <!-- RESEÑAS RECIBIDAS -->
    <section aria-labelledby="received-reviews-title">

      <header class="mb-6 flex items-center justify-between">
      
        <h2
          id="received-reviews-title"
          class="text-2xl font-black text-blue-950"
        >
          Reseñas recibidas
        </h2>
        

        <button
        id="btn-show-more-reviews"
          type="button"
          data-profile-section="reviews"
          class="cursor-pointer font-bold text-blue-600 hover:underline"
        >
          Ver todas
        </button>
      </header>

      <article  id="reviews-container" class="rounded-2xl border border-slate-200 bg-white px-7 shadow-sm">


      </article>
    </section>

  </section>

</main>

  

    `;
}

export async function initializeOrganizerProfilePageEvents() {
  //Mostrar menú de navegación en versión móvil
  initializeMainNavigationEvents();
  // FIN

  //Hacemos dinámico la información del perfil
  renderProfileInfoEvents();

  const btnCrearevent=document.getElementById("btn-create-event")
  if (btnCrearevent) {
    btnCrearevent.addEventListener("click",()=>{
      navigateTo("perfilorganizador/createEvent")
    })
  }

      const contenedorEventos = document.getElementById("Eventos-container");
  if (contenedorEventos) {
        contenedorEventos.innerHTML = "";
      }
}
