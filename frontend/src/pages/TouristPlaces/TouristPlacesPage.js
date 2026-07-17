import { renderMainNavigation,initializeMainNavigationEvents} from "../../components/layout/MainNavigation.js";
import { getDestinations } from "../../services/destinationService.js";
import {renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";
import { renderCategoryFilterCard, setActiveCategoryFilter } from "../../components/cards/CategoryFilterCard.js";
import {
    House,
    MapPinned,
    CalendarDays,
    Music,
    Landmark,
    Trophy,
    UtensilsCrossed,
    Store,
    Drama,
    Baby,
    Compass,
    Navigation
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import { applyFilters } from "../../components/Filter/filter.component.js";
import { serchBar } from "../../components/layout/serchbar.component.js";
import { navigateTo } from "../../router/AppRouter.js";

export function renderTouristPlacesPage() {
    return `
        ${renderMainNavigation()}
        <header class="tourist-hero overflow-hidden bg-[#f6f2e9]">
          <div class="grid min-h-[36rem] lg:grid-cols-[0.9fr_1.1fr]">
            <section class="order-2 flex items-center px-6 py-10 sm:px-10 lg:order-1 lg:px-12 xl:pl-[max(3rem,calc((100vw-80rem)/2))]">
              <article class="w-full max-w-2xl">
                <p class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                  ${renderIconSvg(Compass, { class: "size-5 text-amber-500", strokeWidth: 2.2 })}
                  Tu próxima parada
                </p>

                <h1 class="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
                  Encuentra lugares que
                  <span class="block text-blue-600">merecen ser descubiertos.</span>
                </h1>

                <p class="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-lg sm:leading-7">
                  Historia, gastronomía, naturaleza y cultura local reunidas para ayudarte a explorar Barranquilla a tu manera.
                </p>

                ${serchBar("Buscar museos, parques y lugares...")}

                <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-slate-500">
                  <span class="inline-flex items-center gap-1.5">${renderIconSvg(Navigation, { class: "size-4 text-blue-600", strokeWidth: 2 })} Explora por categoría</span>
                  <span class="inline-flex items-center gap-1.5">${renderIconSvg(MapPinned, { class: "size-4 text-amber-500", strokeWidth: 2 })} Crea tu propia ruta</span>
                </div>
              </article>
            </section>

            <figure class="relative order-1 min-h-72 overflow-hidden lg:order-2 lg:min-h-[36rem] lg:rounded-bl-[6rem]">
              <img
                src="/src/assets/images/aduana.jpg"
                alt="Edificio de la Aduana de Barranquilla"
                class="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div class="absolute right-8 top-8 hidden size-40 rounded-full border border-white/60 sm:block" aria-hidden="true">
                <div class="absolute inset-5 rounded-full border border-white/50"></div>
                <div class="absolute inset-12 rounded-full border border-white/40"></div>
                <span class="absolute left-1/2 top-0 h-full w-px bg-white/50"></span>
                <span class="absolute left-0 top-1/2 h-px w-full bg-white/50"></span>
                <span class="absolute inset-0 flex items-center justify-center text-white drop-shadow-lg">
                  ${renderIconSvg(Compass, { class: "size-7", strokeWidth: 1.8 })}
                </span>
              </div>

              <p class="absolute bottom-8 right-8 hidden text-right text-sm font-bold uppercase tracking-[0.22em] text-white drop-shadow-lg sm:block">
                Barranquilla<br />Colombia
              </p>
            </figure>
          </div>
        </header>
            <main class="tourist-main px-12 py-8">
                <!-- Categorías -->
                <section
                    id="filters_container"
                    class="mt-6 mb-8 flex gap-4 overflow-x-auto pb-2">

                </section>

                <section class="flex items-center gap-3 mb-6">

        ${renderIconSvg(MapPinned, {
            class: "size-8 text-blue-500",
            strokeWidth: 2,
        })}

        <div>

            <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Explora
            </p>

            <h2 class="text-4xl font-bold text-[#0B2E69]">
                Destinos Activos
            </h2>

        </div>

    </section>

        <!-- Tarjetas -->
        <section
            id="destination_container"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        </section>

        </main>
    `
}


export async function initializeTouristPlacesPageEvents() {
     initializeMainNavigationEvents()
    const destination_container = document.getElementById("destination_container")
    const destination_count = document.getElementById("destination_count");
    const filters_container = document.getElementById("filters_container");
    const searchInput = document.getElementById("destination_search");

    const destinations = await getDestinations();
    
    let selectedCategory = "Todos";
    let searchText = "";

    

    function renderDestinations(list) {
        destination_container.innerHTML = list
            .map(destination => renderTouristPlaceCard(destination))
            .join("");
            
        document.querySelectorAll(".tourist-place-card").forEach(function(card){
            card.addEventListener("click", function(event){
                if(event.target.closest(".options-toggle-btn")){
                    return
                }

                const placeId = card.dataset.placeId

                localStorage.setItem("selectedPlaceId", placeId)
                navigateTo("/detailPlace")
            })
        })
        initializeItineraryMenus();
    }

    function applyDestinationFilters() {

    const filtered = applyFilters(destinations,selectedCategory,searchText)

    renderDestinations(filtered);

}

    renderDestinations(destinations);

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
        .map(category => renderCategoryFilterCard(category))
        .join("");

    const filterButtons = filters_container.querySelectorAll("[data-category]");
    setActiveCategoryFilter(filters_container, filterButtons[0]);

    filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;
        setActiveCategoryFilter(filters_container, button);

        applyDestinationFilters();

    });

});

    searchInput.addEventListener("input", (event) => {

     searchText = event.target.value.toLowerCase().trim();

     applyDestinationFilters();


});

}
