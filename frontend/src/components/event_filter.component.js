export function EVENT_FILTER(PARRAFO) {
    return `
    <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-100 hover:bg-sky-50 h-7 relative bottom-70">
            <div
              class=""
            >
              <img
                src="/src/assets/img/places.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <p>
              ${PARRAFO}
            </p>
          </article>
  `;
}
