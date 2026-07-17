import { renderMainNavigation,initializeMainNavigationEvents} from "../../components/layout/MainNavigation.js";
import { getDestinations } from "../../services/destinationService.js";
import {renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";
import { renderCategoryFilterCard } from "../../components/cards/CategoryFilterCard.js";
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
    Baby
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import ventanaMundo from "../../assets/videos/ventana_mundo.mp4";
import { applyFilters } from "../../components/Filter/filter.component.js";
import { serchBar } from "../../components/layout/serchbar.component.js";

export function renderTouristPlacesPage() {
    return `
        ${renderMainNavigation()}
        <header class="tourist-hero relative h-95 overflow-hidden">

            <!-- Imagen de fondo -->
            <figure class="absolute inset-0">
                 <video
                    class="absolute inset-0 block w-full h-full object-cover"
                    autoplay
                    muted
                    loop
                    playsinline
                    >
                <source src="${ventanaMundo}" type="video/mp4" />
                </video>
            </figure>

            <!-- Degradado -->
            <span
                aria-hidden="true"
                class="absolute inset-0 z-10 bg-linear-to-r
                    from-white
                    via-white
                    via-40%
                    to-65%">
            </span>

            <!-- Contenido -->
            <section class="tourist-hero-content relative z-50 flex-col h-full items-start pt-16 px-12 w-3xl ">


                <article class="max-w-2xl">

                    <h1 class="text-5xl font-bold leading-tight text-[#0B2E69]">
                        Descubre los mejores
                        <br>
                        lugares de Barranquilla
                    </h1>

                    <p class="mt-5 text-xl leading-8  text-gray-700 max-w-xl">
                        Explora la historia, la cultura, la naturaleza y los rincones
                        únicos que hacen de Barranquilla una ciudad inolvidable.
                    </p>

                </article>

                ${serchBar()}
            </section>

            <!-- Ola -->
            <svg class="absolute -bottom-1 left-0 z-30 w-full" viewBox="0 0 1440 140" preserveAspectRatio="none"
                aria-hidden="true">

                <path fill="white" d="M0,120
                            C180,20
                            420,20
                            720,110
                            C980,180
                            1180,40
                            1440,100
                            L1440,140
                            L0,140
                            Z" />

            </svg>

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

    document.querySelectorAll("[data-category]").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        applyDestinationFilters();

    });

});

    searchInput.addEventListener("input", (event) => {

     searchText = event.target.value.toLowerCase().trim();

     applyDestinationFilters();


});

}
