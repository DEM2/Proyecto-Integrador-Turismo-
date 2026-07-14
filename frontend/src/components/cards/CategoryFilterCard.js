import { renderIconSvg } from "../../utils/renderIcon.js";

export function renderCategoryFilterCard(category) {
  return `
    <button data-category="${category.name}" class="destination-filter flex w-3xl items-center gap-3 rounded-3xl
           border border-gray-200
           bg-white px-3 py-2
           shadow-sm
           transition-all duration-300
           hover:border-blue-600 hover:shadow-md">
      <span class="flex h-8 w-8 items-center justify-center rounded-full ${category.color} text-white">
        ${renderIconSvg(category.icon, {
          width: 18,
          height: 18,
        })}
      </span>

      <div class="text-left">
        <h3 class="font-semibold">
          ${category.name}
        </h3>
      </div>
    </button>
  `;
}
