import { ListPlus } from "lucide";
import { getSession } from "../../services/authService.js";
import { renderIconSvg } from "../../utils/renderIcon.js";

const CATEGORY_STYLES = {
    "lugares turisticos": { bg: "#E6F1FB", text: "#042C53" },
    "restaurantes": { bg: "#FAECE7", text: "#4A1B0C" },
    "cultura": { bg: "#E1F5EE", text: "#04342C" },
    "naturaleza": { bg: "#EAF3DE", text: "#173404" },
    "compras": { bg: "#FAEEDA", text: "#412402" },
    "vida nocturna": { bg: "#FBEAF0", text: "#4B1528" },
};

function getCategoryStyle(category = "") {
    return CATEGORY_STYLES[category.toLowerCase()] ?? { bg: "#FBEAF0", text: "#DD4E86" };
}

export function renderTouristPlaceCard(destination) {
 
    const { bg, text } = getCategoryStyle(destination.category);
 
    const session = getSession();
    const isExplorer = session?.user?.role === "explorador" || session?.role === "explorador";
    const placeId = destination.id ?? destination._id ?? "";
 
    const optionsButton = isExplorer
        ? `
            <button
                type="button"
                aria-label="Agregar a itinerario"
                data-place-id="${placeId}"
                data-place-name="${destination.place}"
                class="options-toggle-btn peer flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-500  leading-none hover:scale-110 hover:bg-gray-200  text-[#12293F] border-0 outline-none ring-0 shadow-none cursor-pointer">
 
                <span class="flex items-center justify-center">${renderIconSvg(ListPlus, { width: 18, height: 18, strokeWidth: 2 })}</span>
 
            </button>
 
            <!-- Tooltip -->
            <span
                class="absolute top-full right-0 mt-2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition duration-200 peer-hover:opacity-100">
 
                Agregar a itinerario
 
            </span>
 
            <!-- Menú de itinerarios -->
            <div
                class="options-menu hidden absolute top-full right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-2xl z-50 text-left">
 
                <p class="px-4 py-2 text-xs text-gray-400">Cargando...</p>
 
            </div>
        `
        : "";
 
    return `
       <article
    class="overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white shadow-sm transition-shadow hover:shadow-lg">
 
    <!-- Imagen -->
    <figure
        class="group relative h-44 overflow-hidden">
 
        <!-- Imagen -->
        <img
            src="/src/assets/images/hero.png"
            alt="${destination.place}"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
 
        <!-- Categoría -->
        <figcaption
            style="background-color:${bg}; color:${text};"
            class="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-semibold">
 
            ${destination.category}
 
        </figcaption>
 
        <!-- Botón opciones -->
        <div
            class="absolute top-2.5 right-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100 border-none">
 
            ${optionsButton}
 
        </div>
 
    </figure>
 
    <!-- Información -->
    <header class="px-4 pt-3.5 pb-4">
 
        <h3 class="mb-1.5 text-base font-semibold text-[#12293F]">
            ${destination.place}
        </h3>
 
        <p class="flex items-center gap-1 text-xs text-[#4A5C70]">
 
            <strong class="flex items-center gap-1 font-semibold text-[#12293F]">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#C6862A">
                    <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 16.9l-5.9 3.5 1.3-6.6-4.9-4.5 6.6-.7z"/>
                </svg>
                4.8
            </strong>
 
            <span aria-hidden="true">•</span>
 
            <span>${destination.address}</span>
 
        </p>
 
    </header>
 
</article>
    `;
}
