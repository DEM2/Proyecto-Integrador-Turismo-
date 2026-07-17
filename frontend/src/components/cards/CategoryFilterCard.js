import { renderIconSvg } from "../../utils/renderIcon.js";

export function renderCategoryFilterCard(category) {
  return `
    <button type="button" data-category="${category.name}" aria-pressed="false" class="destination-filter flex w-3xl cursor-pointer items-center gap-3 rounded-3xl
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

export function setActiveCategoryFilter(filtersContainer, selectedButton) {
  const filterButtons = filtersContainer.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    const isActive = button === selectedButton;
    const label = button.querySelector("h3");

    button.classList.toggle("border-blue-600", isActive);
    button.classList.toggle("bg-blue-50", isActive);
    button.classList.toggle("ring-2", isActive);
    button.classList.toggle("ring-blue-100", isActive);
    button.classList.toggle("shadow-md", isActive);
    button.classList.toggle("border-gray-200", !isActive);
    button.classList.toggle("bg-white", !isActive);
    button.setAttribute("aria-pressed", String(isActive));

    label?.classList.toggle("text-blue-900", isActive);
  });
}
