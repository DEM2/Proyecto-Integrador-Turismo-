


export function renderEventCard(event) {

  return `
    <article
          class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >

          <figure class="relative h-64 overflow-hidden">
            <img
              src="/src/assets/images/hero.png"
              alt="Carnaval de Barranquilla 2025"
              class="h-full w-full object-cover"
            />

            <time
              datetime="2025-02-15"
              class="absolute left-3 top-3 rounded-xl bg-white px-4 py-2 text-center font-black text-blue-950 shadow-md"
            >
              <span class="block text-xl">15</span>
              <span class="block text-sm">FEB</span>
            </time>

          </figure>

          <section class="space-y-4 p-5">
            <header>
              <h3 class="text-xl font-black text-blue-950">
                Carnaval de Barranquilla 2025
              </h3>
            </header>

            <p>
              <span class="rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-500">
                Festival
              </span>
            </p>

            <footer>
              <strong class="text-xl text-red-500">
                Desde $0
              </strong>
            </footer>
          </section>

        </article>
  `;
}