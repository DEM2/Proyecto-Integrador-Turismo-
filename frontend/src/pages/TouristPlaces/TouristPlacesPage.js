import { renderMainNavigation,initializeMainNavigationEvents} from "../../components/layout/MainNavigation.js";
import { getDestinations } from "../../services/destinationService.js";
import {renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";
import { renderCategoryFilterCard } from "../../components/cards/CategoryFilterCard.js";
import {
    House,
    CalendarDays,
    Music,
    Landmark,
    Trophy,
    UtensilsCrossed,
    Store,
    Drama,
    Baby
} from "lucide";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import ventanaMundo from "../../assets/videos/ventana_mundo.mp4";

export function renderTouristPlacesPage() {
    return `
        ${renderMainNavigation()}
        <header class="relative h-95 overflow-hidden">

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
            <section class="relative z-50 flex-col h-full items-start pt-16 px-12 w-3xl ">


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

                <div class="relative mt-8 w-full max-w-2xl">

    <input
        id="destination_search"
        type="text"
        placeholder="Buscar lugares turísticos..."
        class="h-14 w-full rounded-2xl border border-gray-200 bg-white px-6 pr-14 shadow-xl outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100"
    />

    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">

        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/>

    </svg>

</div>

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
        <main class=" px-12 py-8">
            <!-- Categorías -->
            <section
                id="filters_container"
                class="mt-6 mb-8 flex gap-4 overflow-x-auto pb-2">

            </section>

                <!-- Encabezado -->
                <section class="mb-8">

                    <h2 class=" font-semibold text-[#0B2E69] text-xl">

                        <span id="destination_count">245</span>
                        <span class="">
                            Destinos encontrados
                        </span>

                    </h2>

                </section>

                <!-- Tarjetas -->
                <section
                    id="destination_container"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

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
    destination_count.textContent = destinations.length;

    let selectedCategory = "Todos";
    let searchText = "";

    

    function renderDestinations(list) {
        destination_container.innerHTML = list
            .map(destination => renderTouristPlaceCard(destination))
            .join("");

        destination_count.textContent = list.length;

        initializeItineraryMenus();
    }

    function applyFilters() {

    const filtered = destinations.filter(destination => {

        const matchesCategory =
            selectedCategory === "Todos" ||
            destination.category === selectedCategory;

        const matchesSearch =
            destination.place.toLowerCase().includes(searchText) 

        return matchesCategory && matchesSearch;

    });

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

        applyFilters();

    });

});

    searchInput.addEventListener("input", (event) => {

     searchText = event.target.value.toLowerCase().trim();

     applyFilters();


});

}