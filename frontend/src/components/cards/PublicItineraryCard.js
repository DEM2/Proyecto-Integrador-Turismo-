export function renderPublicItineraryCard() {
  return `
    <article
      class="flex flex-col bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 ease-out cursor-pointer"
    >
      <img
        src="/src/assets/images/hero.png"
        alt="Ruta cultural por el centro"
        class="w-full h-40 object-cover"
      />

      <div class="p-4 flex flex-col gap-2">
        <span
          class="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full w-fit"
        >
          Cultural
        </span>

        <h3 class="font-bold text-blue-950 text-lg">Ruta cultural por el centro</h3>

        <p class="text-sm text-gray-700 leading-relaxed">
          Descubre la historia, arquitectura y tradiciones del corazon de Barranquilla.
        </p>

        <button
          class="mt-3 cursor-pointer bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-lg hover:bg-sky-700 transition"
        >
          Ver itinerario
        </button>
      </div>
    </article>
  `;
}
