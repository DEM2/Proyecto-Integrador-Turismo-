import {
  renderMainNavigation,
  initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { renderEventCard } from "../../components/cards/EventsCardOrganizador.js";
import { renderProfileInfo, renderProfileInfoEvents } from "./renderprofileorganizador.js";
import { getOrganizerAllEvents } from "../../services/reviews.service.js";
import { getSession } from "../../services/authService.js";
import { navigateTo } from "../../router/AppRouter.js";
import { alertaError } from "../../utils/alerts.js";

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

      <header class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

      
        <h2
          id="created-events-title"
          class="text-2xl font-black text-blue-950"
        >
          Eventos creados
        </h2>
        
        <div class="flex flex-wrap items-center gap-3">
          <button
            id="btn-create-place"
            type="button"
            class="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-bold text-purple-700 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
          >
            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Crear lugar
          </button>
          <button
            id="btn-create-event"
            type="button"
            data-organizer-view="create-event"
            class="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 3v3m12-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
              <path stroke-linecap="round" d="M12 12v5m-2.5-2.5h5" />
            </svg>
            Crear evento
          </button>
        </div>
        
      </header>

      <section id="Eventos-container" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <!-- EVENTOS -->
      </section>

      <div id="show-all-events-wrapper" class="mt-8 flex justify-center">
        <button
          id="btn-show-all-events"
          type="button"
          aria-expanded="false"
          class="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-blue-950 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
        >
          <span id="show-all-events-label">Ver todos</span>
          <svg id="show-all-events-icon" class="h-4 w-4 transition-transform" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
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

  const btnCreatePlace = document.getElementById("btn-create-place");

  if(!btnCreatePlace){
    return
  }
  
  btnCreatePlace.addEventListener("click", () => {
    navigateTo("/perfilorganizador/createPlace");
  });


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
    const btnShowAllEventsLabel = document.getElementById("show-all-events-label");
    const btnShowAllEventsIcon = document.getElementById("show-all-events-icon");
    const showAllEventsWrapper = document.getElementById("show-all-events-wrapper");

    if (btnShowAllEvents) {
      let showingAllEvents = false;
      let allBackendEvents = null;

      btnShowAllEvents.addEventListener("click", async () => {
        if (showingAllEvents) {
          contenedorEventos.innerHTML = eventos.map((evento) => renderEventCard(evento)).join("");
          showingAllEvents = false;
          btnShowAllEventsLabel.textContent = "Ver todos";
          btnShowAllEvents.setAttribute("aria-expanded", "false");
          btnShowAllEventsIcon.classList.remove("rotate-180");
          return;
        }

        const session = getSession();
        const userId = session?.user?.id;

        if (!userId) {
          alertaError("No se pudo cargar los eventos. Inicia sesión de nuevo.");
          return;
        }

        try {
          btnShowAllEvents.disabled = true;
          btnShowAllEventsLabel.textContent = "Cargando...";
          allBackendEvents ??= await getOrganizerAllEvents(userId);

          if (allBackendEvents.length > 0) {
            contenedorEventos.innerHTML = allBackendEvents.map((evento) => renderEventCard(evento)).join("");
          } else {
            contenedorEventos.innerHTML = "<p class='col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600'>Aún no tienes eventos creados.</p>";
          }

          showingAllEvents = true;
          btnShowAllEventsLabel.textContent = "Mostrar menos";
          btnShowAllEvents.setAttribute("aria-expanded", "true");
          btnShowAllEventsIcon.classList.add("rotate-180");
        } catch (error) {
          console.error(error);
          btnShowAllEventsLabel.textContent = "Ver todos";
          alertaError("Error al cargar todos los eventos. Intenta de nuevo.");
        } finally {
          btnShowAllEvents.disabled = false;
        }
      });

      const totalEvents = profileData?.counts?.events ?? allEvents.length;
      
      if (totalEvents <= 4) {
        showAllEventsWrapper?.classList.add("hidden");
      }
    }
  }
}
