import {
    renderMainNavigation,
    initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { getDestinations } from "../../services/destinationService.js";
import { renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";
import {
    renderCategoryFilterCard,
    setActiveCategoryFilter,
} from "../../components/cards/CategoryFilterCard.js";
import {
    House,
    MapPinned,
    Landmark,
    UtensilsCrossed,
    Trees,
    ShoppingBag,
    Moon,
    Compass,
    Navigation,
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import { applyFilters } from "../../components/Filter/filter.component.js";
import { serchBar } from "../../components/layout/serchbar.component.js";
import { navigateTo } from "../../router/AppRouter.js";
import { alertaError } from "../../utils/alertsss.js";

export function renderTouristPlacesPage() {
    return `
        ${renderMainNavigation()}

        <header class="tourist-hero relative isolate !h-auto !min-h-0 overflow-hidden !pb-0 bg-[#06152f]" aria-labelledby="destinations-hero-title">
          <div class="absolute inset-0">
            <img
              src="/images/mallorquin.png"
              alt="Vista aérea de la Ciénaga de Mallorquín, sus manglares y sendero de madera"
              class="h-full w-full object-cover object-[65%_center] lg:object-center"
            />
            <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,43,55,0.97)_0%,rgba(3,32,50,0.92)_100%),linear-gradient(0deg,rgba(2,14,30,0.45),rgba(2,14,30,0.1))] lg:bg-[linear-gradient(90deg,rgba(3,43,55,0.98)_0%,rgba(3,37,53,0.94)_25%,rgba(4,31,48,0.72)_45%,rgba(4,25,43,0.24)_66%,rgba(4,25,43,0.04)_100%),linear-gradient(0deg,rgba(2,14,30,0.35),transparent_45%)]" aria-hidden="true"></div>

            <p class="absolute bottom-[6.25rem] left-5 inline-flex max-w-[calc(100%-2.5rem)] items-center gap-2 rounded-full border border-cyan-200/30 bg-slate-950/65 px-4 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md sm:left-8 lg:bottom-[7.25rem] lg:left-[46%]">
              ${renderIconSvg(MapPinned, { class: "size-5 shrink-0 text-cyan-300", strokeWidth: 2 })}
              Ciénaga de Mallorquín
            </p>
          </div>

          <div class="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -left-44 top-8 size-[30rem] rounded-full border border-cyan-300/10" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -left-32 top-20 size-[23rem] rounded-full border border-emerald-300/10" aria-hidden="true"></div>

          <div class="relative mx-auto flex max-w-[92rem] items-center px-5 py-12 sm:px-8 lg:min-h-[36rem] lg:px-12 lg:py-10 xl:min-h-[38rem]">
            <section class="w-full max-w-2xl">
              <p class="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md">
                ${renderIconSvg(Compass, { class: "size-4 text-cyan-300", strokeWidth: 2.2 })}
                Tu próxima parada
              </p>

              <h1 id="destinations-hero-title" class="mt-5 max-w-2xl text-[clamp(2.5rem,4vw,4rem)] font-black leading-[1.03] tracking-tight text-white">
                <span class="block">Encuentra</span>
                <span class="block">lugares que</span>
                <span class="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">merecen ser</span>
                <span class="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">descubiertos.</span>
              </h1>

              <p class="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Historia, gastronomía, naturaleza y cultura local reunidas para ayudarte a explorar Barranquilla a tu manera.
              </p>

              <div class="[&>div]:!mt-6 [&_input:focus]:ring-cyan-400/30">
                ${serchBar("Buscar museos, parques y lugares...")}
              </div>

              <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-semibold">
                <span class="inline-flex items-center gap-2 text-cyan-300 transition-colors hover:text-cyan-200">
                  ${renderIconSvg(Navigation, { class: "size-5", strokeWidth: 2 })}
                  Explora por categoría
                </span>
                <span class="hidden h-6 w-px bg-white/20 sm:block" aria-hidden="true"></span>
                <span class="inline-flex items-center gap-2 text-amber-300 transition-colors hover:text-amber-200">
                  ${renderIconSvg(MapPinned, { class: "size-5", strokeWidth: 2 })}
                  Crea tu propia ruta
                </span>
              </div>
            </section>
          </div>

          <section class="relative mx-auto w-full max-w-[96rem] px-4 pb-7 sm:px-8 lg:px-10" aria-label="Filtrar destinos por categoría">
            <div class="rounded-[1.75rem] border border-white/15 bg-[rgba(7,31,54,0.78)] p-2.5 shadow-[0_18px_55px_rgba(2,8,23,0.28)] backdrop-blur-md">
              <div
                id="filters_container"
                class="!m-0 !flex !w-full !grid-cols-none !justify-start !gap-3 !overflow-x-auto !p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:!justify-center">
              </div>
            </div>
          </section>
        </header>

        <main class="tourist-main mx-auto w-full max-w-[96rem] !px-5 !pb-12 !pt-6 sm:!px-8 lg:!px-10 lg:!pt-7">
          <header class="mb-7 flex items-center gap-3">
            ${renderIconSvg(MapPinned, {
              class: "size-8 text-cyan-600",
              strokeWidth: 2,
            })}

            <div>
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Explora</p>
              <h2 class="text-3xl font-bold text-[#0B2E69] sm:text-4xl">Destinos Activos</h2>
            </div>
          </header>

          <section
            id="destination_container"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          </section>
        </main>
    `;
}

export async function initializeTouristPlacesPageEvents() {
    initializeMainNavigationEvents();

    const destinationContainer = document.getElementById("destination_container");
    const filtersContainer = document.getElementById("filters_container");
    const searchInput = document.getElementById("destination_search");
    let destinations = [];
    let selectedCategory = "Todos";
    let searchText = "";

    const categories = [
        { name: "Todos", icon: House, color: "bg-blue-600", activeColor: "#2563eb", activeGlow: "rgba(37, 99, 235, 0.28)" },
        { name: "Lugares turísticos", icon: MapPinned, color: "bg-cyan-500", activeColor: "#0891b2", activeGlow: "rgba(8, 145, 178, 0.28)" },
        { name: "Restaurantes", icon: UtensilsCrossed, color: "bg-orange-500", activeColor: "#ea580c", activeGlow: "rgba(234, 88, 12, 0.28)" },
        { name: "Cultura", icon: Landmark, color: "bg-fuchsia-500", activeColor: "#c026d3", activeGlow: "rgba(192, 38, 211, 0.28)" },
        { name: "Naturaleza", icon: Trees, color: "bg-emerald-500", activeColor: "#059669", activeGlow: "rgba(5, 150, 105, 0.28)" },
        { name: "Compras", icon: ShoppingBag, color: "bg-amber-500", activeColor: "#d97706", activeGlow: "rgba(217, 119, 6, 0.28)" },
        { name: "Vida nocturna", icon: Moon, color: "bg-indigo-500", activeColor: "#4f46e5", activeGlow: "rgba(79, 70, 229, 0.28)" },
    ];

    function renderDestinations(list) {
        destinationContainer.innerHTML = list
            .map((destination) => renderTouristPlaceCard(destination))
            .join("");

        document.querySelectorAll(".tourist-place-card").forEach((card) => {
            card.addEventListener("click", (event) => {
                if (event.target.closest(".options-toggle-btn")) return;

                localStorage.setItem("selectedPlaceId", card.dataset.placeId);
                navigateTo("/detailPlace");
            });
        });

        initializeItineraryMenus();
    }

    function applyDestinationFilters() {
        renderDestinations(applyFilters(destinations, selectedCategory, searchText));
    }

    filtersContainer.innerHTML = categories
        .map((category) => renderCategoryFilterCard(category))
        .join("");

    const filterButtons = filtersContainer.querySelectorAll("[data-category]");
    setActiveCategoryFilter(filtersContainer, filterButtons[0]);

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
            setActiveCategoryFilter(filtersContainer, button);
            applyDestinationFilters();
        });
    });

    searchInput.setAttribute("aria-label", "Buscar destinos por nombre");
    searchInput.addEventListener("input", (event) => {
        searchText = event.target.value.toLowerCase().trim();
        applyDestinationFilters();
    });

    try {
        destinations = await getDestinations();
        renderDestinations(destinations);
    } catch (error) {
        alertaError(error.message);
    }
}
