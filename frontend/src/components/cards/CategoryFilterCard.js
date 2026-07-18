import { renderIconSvg } from "../../utils/renderIcon.js";

export function renderCategoryFilterCard(category) {
  const activeColor = category.activeColor ?? "#2563eb";
  const activeGlow = category.activeGlow ?? "rgba(37, 99, 235, 0.28)";

  return `
    <button
      type="button"
      data-category="${category.name}"
      data-active-color="${activeColor}"
      data-active-glow="${activeGlow}"
      aria-pressed="false"
      class="destination-filter flex shrink-0 cursor-pointer !min-h-0 !w-auto !flex-row !items-center !justify-start !gap-3 !rounded-full !border-white/25 !bg-white/[0.04] !px-4 !py-2.5 text-white shadow-none backdrop-blur-md transition-all duration-300 hover:!border-white/45 hover:!bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none">
      <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${category.color} text-white shadow-sm">
        ${renderIconSvg(category.icon, {
          width: 18,
          height: 18,
        })}
      </span>

      <span class="!text-left">
        <span class="block !text-sm font-semibold text-white sm:!text-base">
          ${category.name}
        </span>
      </span>
    </button>
  `;
}

export function setActiveCategoryFilter(filtersContainer, selectedButton) {
  const filterButtons = filtersContainer.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    const isActive = button === selectedButton;
    const activeColor = button.dataset.activeColor || "#2563eb";
    const activeGlow = button.dataset.activeGlow || "rgba(37, 99, 235, 0.28)";

    button.classList.toggle("!border-white/25", !isActive);
    button.classList.toggle("!bg-white/[0.04]", !isActive);

    if (isActive) {
      button.style.setProperty("background-color", activeColor, "important");
      button.style.setProperty("border-color", activeColor, "important");
      button.style.setProperty("box-shadow", `0 10px 30px ${activeGlow}`);
    } else {
      button.style.removeProperty("background-color");
      button.style.removeProperty("border-color");
      button.style.removeProperty("box-shadow");
    }

    button.setAttribute("aria-pressed", String(isActive));
  });
}
