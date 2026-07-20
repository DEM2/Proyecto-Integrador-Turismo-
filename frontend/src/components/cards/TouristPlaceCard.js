import { ListPlus, Landmark, UtensilsCrossed, Theater, Trees, ShoppingBag, Moon, MapPin, Navigation } from "lucide";
import { getSession } from "../../services/authService.js";
import { renderIconSvg } from "../../utils/renderIcon.js";

const CATEGORY_STYLES = {
    "lugares turisticos": { bg: "#E6F1FB", text: "#042C53", icon: Landmark },
    "restaurantes": { bg: "#FAECE7", text: "#4A1B0C", icon: UtensilsCrossed },
    "cultura": { bg: "#E1F5EE", text: "#04342C", icon: Theater },
    "naturaleza": { bg: "#EAF3DE", text: "#173404", icon: Trees },
    "compras": { bg: "#FAEEDA", text: "#412402", icon: ShoppingBag },
    "vida nocturna": { bg: "#FBEAF0", text: "#4B1528", icon: Moon },
};

export function getCategoryStyle(category = "") {
    return CATEGORY_STYLES[category.toLowerCase()] ?? { bg: "#FBEAF0", text: "#DD4E86", icon: MapPin };
}

export function renderTouristPlaceCard(destination, itemType = "place") {

    const { bg, text, icon } = getCategoryStyle(destination.category);
    const session = getSession();
    const isExplorer = session?.user?.role === "explorador" || session?.role === "explorador";
    const placeId = destination.id ?? destination._id ?? "";

   const optionsButton = isExplorer
  ? `
       <button
        type="button"
        aria-label="Agregar a itinerario"
        data-item-type="${itemType}"
        data-item-id="${placeId}"
        data-item-name="${destination.place}"
        class="options-toggle-btn absolute top-2.5 right-2.5 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-3xl bg-white opacity-0 shadow-md pointer-events-none transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 hover:pointer-events-auto hover:bg-violet-50 hover:text-violet-600 hover:opacity-100 focus:pointer-events-auto focus:opacity-100 active:pointer-events-auto active:opacity-100 [@media(hover:none)]:!pointer-events-auto [@media(hover:none)]:!opacity-100"
      >

        ${renderIconSvg(ListPlus,{
          class:"size-5",
          strokeWidth:2
        })}

      </button>
    `
  : "";

    return `
       <article
       data-place-id="${placeId}"
    class="tourist-place-card group cursor-pointer overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white shadow-sm transition-shadow hover:shadow-lg">

    <!-- Imagen -->
   <figure class="relative h-44 overflow-hidden">

        <!-- Imagen -->
        <img
            src="/images/hero.png"
            alt="${destination.place}"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">

        <!-- Categoría -->
        <figcaption
            style="background-color:${bg}; color:${text};"
            class="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">

            <span class="flex items-center">${renderIconSvg(icon, { width: 12, height: 12, strokeWidth: 2.25 })}</span>
            ${destination.category}

        </figcaption>

        

            ${optionsButton}


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

            <span class="text-[#8A94A0]">(${destination.reviewsCount ?? "1.2k"} reseñas)</span>

        </p>

        <p class="mt-1.5 flex items-start gap-1 text-xs text-[#4A5C70]">
            <span class="mt-0.5 flex shrink-0 items-center">${renderIconSvg(Navigation, { width: 12, height: 12, strokeWidth: 2 })}</span>
            <span>${destination.address}</span>
        </p>

    </header>

</article>
    `;
}
