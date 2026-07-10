export function EVENT_FILTER(PARRAFO,img) {
    return `
    <article class="flex items-center gap-3  p-5 rounded-3xl shadow-lg shadow-gray-100 hover:bg-sky-50 h-7 relative bottom-70">
            <div
              class=""
            >
              <img
                src="/src/assets/img/${img}"
                alt="Sitios destacados"
                class="w-5 h-5"
              />
            </div>
            <p>
              ${PARRAFO}
            </p>
          </article>
  `;
}
