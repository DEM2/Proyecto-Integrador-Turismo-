import { iconSVG } from "../utils/icons.js";

export function filterCard(category) {

    return `
    <button data-category="${category.name}" class="destination-filter flex min-w-56.25 items-center gap-3 rounded-2xl
           border border-gray-200
           bg-white px-4 py-3
           shadow-sm
           transition-all duration-300
           hover:border-blue-600 hover:shadow-md">
    <span class="flex h-11 w-11 items-center justify-center rounded-full ${category.color} text-white">

        ${iconSVG(category.icon,{
        width:22,
        height:22,
        strokeWidth:2
        })}

    </span>

    <div class="text-left">

        <h3 class="font-semibold">
            ${category.name}
        </h3>

        <p class="text-xs text-gray-500">
            ${category.description}
        </p>

    </div>

</button>
    `;
}

