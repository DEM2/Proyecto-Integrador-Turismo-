import {
  renderMainNavigation,
  initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { renderEventCard } from "../../components/cards/EventsCardOrganizador.js";
import { renderProfileInfo, renderProfileInfoEvents } from "./renderprofileorganizador.js";
import { getOrganizerAllEvents } from "../../services/reviews.service.js";
import { getSession } from "../../services/authService.js";
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
        <button id="btn-show-all-events"
          type="button"
          class="font-bold text-blue-600 hover:underline cursor-pointer"
        >
          Ver todos
        </button>
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

    

</main>

  

    `;
}

export async function initializeOrganizerProfilePageEvents() {
  //Mostrar menú de navegación en versión móvil
  initializeMainNavigationEvents();
  // FIN

  const btnCrearevent=document.getElementById("btn-create-event")
  if (btnCrearevent) {
    btnCrearevent.addEventListener("click",()=>{
      navigateTo("perfilorganizador/createEvent")
    })
  }

  const contenedorEventos = document.getElementById("Eventos-container");
  if (contenedorEventos) {
    contenedorEventos.innerHTML = "<p class='col-span-full rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600'>Cargando eventos...</p>";
  }

  //Hacemos dinámico la información del perfil
  const profileData = await renderProfileInfoEvents();

  if (contenedorEventos) {
    const allEvents = profileData?.events ?? [];
    const eventos = allEvents.slice(0, 4);

    if (eventos.length > 0) {
      contenedorEventos.innerHTML = eventos.map((evento) => renderEventCard(evento)).join("");
    } else {
      contenedorEventos.innerHTML = "<p class='col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600'>Aún no tienes eventos creados.</p>";
    }

    const btnShowAllEvents = document.getElementById("btn-show-all-events");
    if (btnShowAllEvents) {
      btnShowAllEvents.addEventListener("click", async () => {
        const session = getSession();
        const userId = session?.user?.id;

        if (!userId) {
          alert("No se pudo cargar los eventos. Inicia sesión de nuevo.");
          return;
        }

        try {
          const allBackendEvents = await getOrganizerAllEvents(userId);

          if (allBackendEvents.length > 0) {
            contenedorEventos.innerHTML = allBackendEvents.map((evento) => renderEventCard(evento)).join("");
          } else {
            contenedorEventos.innerHTML = "<p class='col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600'>Aún no tienes eventos creados.</p>";
          }

          btnShowAllEvents.classList.add("opacity-50", "pointer-events-none");
        } catch (error) {
          console.error(error);
          alert("Error al cargar todos los eventos. Intenta de nuevo.");
        }
      });

      const totalEvents = profileData?.counts?.events ?? allEvents.length;
      
      if (totalEvents <= 4) {
        btnShowAllEvents.classList.add("opacity-50", "pointer-events-none");
      }
    }
  }
}
