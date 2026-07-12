export function EVENT_FILTER(PARRAFO, img) {
  return `
     <article class="flex items-center gap-3  bg-white rounded-2xl px-6 py-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all
      cursor-pointer">
      <img
        src="/src/assets/img/${img}"
        class="w-6 h-6"
      >
      <p class="font-medium text-slate-800">
        ${PARRAFO}
      </p>

    </article>
  `;
}
