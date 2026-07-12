import { NAV_BAR } from "../components/nav_bar.component.js";
import { getDestinations } from "../services/destination.service.js";
import { destinationCard } from "../components/destinationCard.component.js";
import { filterCard } from "../components/filterCard.component.js";
import {
    House,
    Landmark,
    Trees,
    UtensilsCrossed,
    Hotel,
    ShoppingBag
} from "lucide";

export function destination(params) {
    return `
        ${NAV_BAR()}
        <header class="relative h-95 overflow-hidden">

            <!-- Imagen de fondo -->
            <figure class="absolute inset-0">
                <video class="absolute inset-0 block w-full h-full object-cover" autoplay muted loop playsinline>

                    <source src="/src/assets/video/ventana_mundo.mp4" type="video/mp4">

                    Tu navegador no soporta videos HTML5.

                </video>
            </figure>

            <!-- Degradado -->
            <span aria-hidden="true" class="absolute inset-0 z-10 bg-linear-to-r
               from-white
               via-white
                 via-40%
                 to-transparent">
            </span>

            <!-- Contenido -->
            <section class="relative z-40 flex h-full items-start pt-16 px-16">

                <article class="max-w-2xl">

                    <h1 class="text-5xl font-extrabold leading-tight text-[#0B2E69]">
                        Descubre los mejores
                        <br>
                        lugares de Barranquilla
                    </h1>

                    <p class="mt-5 text-lg leading-8 text-gray-600">
                        Explora la historia, la cultura, la naturaleza y los rincones
                        únicos que hacen de Barranquilla una ciudad inolvidable.
                    </p>

                </article>

            </section>

            <!-- Ola -->
            <svg class="absolute -bottom-1 left-0 z-30 w-full" viewBox="0 0 1440 140" preserveAspectRatio="none"
                aria-hidden="true">

                <path fill="white" d="M0,120
                            C180,20
                            420,20
                            720,110
                            C980,180
                            1180,40
                            1440,100
                            L1440,140
                            L0,140
                            Z" />

            </svg>

        </header>
        <main class="mx-20  px-1 py-8">
            <!-- Categorías -->
            <section
                id="filters_container"
                class="mt-6 mb-8 flex gap-4 overflow-x-auto pb-2">

            </section>

                <!-- Encabezado -->
                <section class="mb-8">

                    <h2 class="text-2xl font-bold text-[#0B2E69]">

                        <span id="destination_count">245</span>
                        <span class="text-lg font-semibold text-[#0B2E69]">
                            destinos encontrados
                        </span>

                    </h2>

                </section>

                <!-- Tarjetas -->
                <section
                    id="destination_container"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                </section>

        </main>
    `
}


export async function destiation_event() {

    const destination_container = document.getElementById("destination_container")
    const destination_count = document.getElementById("destination_count");
    const filters_container = document.getElementById("filters_container");

    const destinations = await getDestinations();
    destination_count.textContent = destinations.length;

    destination_container.innerHTML = destinations.map(d => destinationCard(d)).join("")

    const categories = [

        {
            name: "Todos",
            description: "Explora todo",
            icon: House,
            color: "bg-blue-600"
        },

        {
            name: "Cultura",
            description: "Historia y tradición",
            icon: Landmark,
            color: "bg-pink-500"
        },

        {
            name: "Naturaleza",
            description: "Parques y playas",
            icon: Trees,
            color: "bg-green-500"
        },

        {
            name: "Restaurantes",
            description: "Sabores locales",
            icon: UtensilsCrossed,
            color: "bg-orange-500"
        },

        {
            name: "Hoteles",
            description: "Hospedajes",
            icon: Hotel,
            color: "bg-cyan-500"
        },

        {
            name: "Compras",
            description: "Centros comerciales",
            icon: ShoppingBag,
            color: "bg-purple-500"
        }

    ];

    filters_container.innerHTML = categories
        .map(category => filterCard(category))
        .join("");

}