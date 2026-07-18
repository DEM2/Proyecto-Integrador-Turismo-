export function initFiltersScroll() {
  const wrapper = document.getElementById("filters_scroll_wrapper");
  const track = document.getElementById("filters_container");
  const nextBtn = document.getElementById("filters_scroll_next");
  const pagination = document.getElementById("filters_pagination");

  if (!wrapper || !track) return;

  const buildDots = () => {
    if (!pagination) return;
    const items = track.querySelectorAll("[data-category]");
    pagination.innerHTML = "";
    items.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className =
        "filters-pagination-dot size-1.5 rounded-full bg-slate-300 transition-all duration-200 [&.is-active]:w-4 [&.is-active]:bg-blue-600" + (index === 0 ? " is-active" : "");
      pagination.appendChild(dot);
    });
  };

  const updateOverflowState = () => {
    const hasOverflow = track.scrollWidth > track.clientWidth + 4;
    wrapper.classList.toggle("has-overflow", hasOverflow);
  };

  const updateActiveDot = () => {
    if (!pagination) return;
    const dots = pagination.querySelectorAll(".filters-pagination-dot");
    if (!dots.length) return;

    const items = [...track.querySelectorAll("[data-category]")];
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - scrollCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    dots.forEach((dot, index) =>
      dot.classList.toggle("is-active", index === closestIndex)
    );
  };

  buildDots();
  updateOverflowState();
  updateActiveDot();

  track.addEventListener(
    "scroll",
    () => window.requestAnimationFrame(updateActiveDot),
    { passive: true }
  );

  nextBtn?.addEventListener("click", () => {
    track.scrollBy({ left: 160, behavior: "smooth" });
  });

  window.addEventListener("resize", () => {
    updateOverflowState();
    updateActiveDot();
  });

  // Las categorías se pintan dinámicamente en #filters_container,
  // así que observamos cambios para reconstruir puntos/overflow.
  const observer = new MutationObserver(() => {
    buildDots();
    updateOverflowState();
    updateActiveDot();
  });
  observer.observe(track, { childList: true });
}
