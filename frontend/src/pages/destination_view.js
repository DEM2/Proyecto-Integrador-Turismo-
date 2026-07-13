import { NAV_BAR,NavbarEvents} from "../components/nav_bar.component.js";
import { getDestinations } from "../services/destination.service.js";
import {placeCard } from "../components/placeCard.component.js";
import { filterCard } from "../components/filterCard.component.js";
import {
    House,
    CalendarDays,
    Music,
    Landmark,
    Trophy,
    UtensilsCrossed,
    Store,
    Drama,
    Baby
} from "lucide";

export function destination(params) {
    return `
        ${NAV_BAR()}
        <header class="relative h-95 overflow-hidden">

            <!-- Imagen de fondo -->
            <figure class="absolute inset-0">
                <img src="/src/assets/img/auduana2.jpg" class="absolute inset-0 block w-full h-full object-cover" alt="Fondo"/>
            </figure>

            <!-- Degradado -->
            <span
                aria-hidden="true"
                class="absolute inset-0 z-10 bg-linear-to-r
                    from-white
                    via-white
                    via-40%
                    to-65%">
            </span>

            <!-- Contenido -->
            <section class="relative z-50 flex h-full items-start pt-16 px-12 w-3xl ">


                <article class="max-w-2xl">

                    <h1 class="text-6xl font-extrabold leading-tight text-[#0B2E69]">
                        Descubre los mejores
                        <br>
                        lugares de Barranquilla
                    </h1>

                    <p class="mt-5 text-xl leading-8  text-gray-700">
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
        <main class=" px-12 py-8">
            <!-- Categorías -->
            <section
                id="filters_container"
                class="mt-6 mb-8 flex gap-4 overflow-x-auto pb-2">

            </section>

                <!-- Encabezado -->
                <section class="mb-8">

                    <h2 class=" font-semibold text-[#0B2E69] text-3xl">

                        <span id="destination_count">245</span>
                        <span class="   text-3xl">
                            Destinos encontrados
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
     NavbarEvents()
    const destination_container = document.getElementById("destination_container")
    const destination_count = document.getElementById("destination_count");
    const filters_container = document.getElementById("filters_container");

    const destinations = await getDestinations();
    destination_count.textContent = destinations.length;

    destination_container.innerHTML = destinations.map(d => placeCard(d)).join("")

    const categories = [

    {
        name: "Todos",
        description: "Explora todos los eventos",
        icon: House,
        color: "bg-blue-600"
    },

    {
        name: "Festival",
        description: "Celebraciones y festivales",
        icon: CalendarDays,
        color: "bg-red-500"
    },

    {
        name: "Concierto",
        description: "Música en vivo",
        icon: Music,
        color: "bg-purple-500"
    },

    {
        name: "Cultura",
        description: "Arte y patrimonio",
        icon: Landmark,
        color: "bg-pink-500"
    },

    {
        name: "Deportes",
        description: "Eventos deportivos",
        icon: Trophy,
        color: "bg-green-600"
    },

    {
        name: "Gastronomía",
        description: "Sabores del Caribe",
        icon: UtensilsCrossed,
        color: "bg-orange-500"
    },

    {
        name: "Feria",
        description: "Exposiciones y negocios",
        icon: Store,
        color: "bg-cyan-500"
    },

    {
        name: "Teatro",
        description: "Obras y espectáculos",
        icon: Drama,
        color: "bg-indigo-500"
    },

    {
        name: "Infantil",
        description: "Diversión para niños",
        icon: Baby,
        color: "bg-yellow-500"
    }

];
    filters_container.innerHTML = categories
        .map(category => filterCard(category))
        .join("");

}