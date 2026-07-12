
export function destinationCard(destino) {

    return `
       <article
    class="overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white transition-shadow hover:shadow-md">

    <!-- Imagen -->
    <figure
        class="group relative h-32.5 overflow-hidden">

        <!-- Imagen -->
        <img
            src="/src/assets/img/hero.png"
            alt="${destino.place}"
            class="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-60">

        <!-- Categoría -->
        <figcaption
            class="absolute top-2.5 left-2.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#DD4E86]">

            ${destino.category}

        </figcaption>

        <!-- Botón opciones -->
        <div
            class="absolute top-2.5 right-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100 border-none">

            <button
                type="button"
                aria-label="Opciones"
                class="peer flex h-8 w-8 items-center justify-center rounded-full  hover:scale-110 border-0 outline-none ring-0 shadow-none ">

                <svg
                    class="h-5 w-5 text-[#12293F]"
                    viewBox="0 0 24 24"
                    fill="currentColor">

                    <circle cx="5" cy="12" r="1.8"/>
                    <circle cx="12" cy="12" r="1.8"/>
                    <circle cx="19" cy="12" r="1.8"/>

                </svg>

            </button>

            <!-- Tooltip -->
            <span
                class="absolute top-full right-0 mt-2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition duration-200 peer-hover:opacity-100">

                Opciones

            </span>

        </div>

    </figure>

    <!-- Información -->
    <header class="px-3.5 pt-3 pb-4">

        <h3 class="mb-1 text-[14.5px] font-semibold text-[#12293F]">
            ${destino.place}
        </h3>

        <p class="flex items-center gap-1 text-xs text-[#4A5C70]">

            <strong class="font-semibold text-[#12293F]">
                ★ 4.8
            </strong>

            <span aria-hidden="true">•</span>

            <span>${destino.address}</span>

        </p>

    </header>

</article>
    `;
}