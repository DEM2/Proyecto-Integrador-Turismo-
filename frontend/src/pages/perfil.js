import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR, NavbarEvents } from "../components/nav_bar.component.js";
import { FollowButton } from "../components/btn_seguir.component.js";
import { cardReseña } from "../components/card_reseña.component.js";
import { cadItinerario } from "../components/card_itinerario.component.js";

export function perfil() {
  return `
  ${NAV_BAR()}

  
    <main class="relative w-full h-60">

  <!-- Hero principal -->
  <section class="relative w-full h-60">

    <img
      src="/src/assets/img/hero3.png"
      alt="Imagen principal"
      class="w-full h-full object-cover"
    />

    <!-- Perfil superpuesto -->
    <div
      class="absolute bottom-3 md:left-34 md:right-0 flex items-center gap-4 h-60"
    >
      <img
        src="/src/assets/img/familias.webp"
        alt="Foto de perfil"
        class="size-50 rounded-full border-4 border-white object-cover z-10"
      />

      <img
        src="/src/assets/img/explore2.png"
        alt="Icono explorador"
        class="size-13 object-contain absolute bottom-4 left-35 z-20"
      />
    </div>

    <!-- Información del usuario -->
    <article
      class="absolute top-0 left-0 w-full h-60 bg-black/50 text-white"
    >
      <div
        class="absolute max-[500px]:top-1 left-51 top-8 md:top-16 md:left-85 right-0"
      >
        <div class="flex flex-wrap md:flex-nowrap items-center">

          <h2 class="font-bold text-xl md:text-2xl md:pr-3">
            Mateo Mercado
          </h2>

          <span id="btn-follow"></span>

        </div>

        <p class="text-xs mt-1">
          @Matero123_sew
        </p>

        <p class="text-xs mt-2 max-w-70">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto...
        </p>

        <!-- Redes sociales -->
        <ul class="flex flex-wrap md:flex-nowrap gap-2 pt-2 w-full">

          <li>
            <a
              href="#"
              class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl px-1 py-1"
            >
              <img
                src="/src/assets/img/instagram.svg"
                alt="Instagram"
                class="size-5 object-cover"
              />

              mateo mercado
            </a>
          </li>

          <li>
            <a
              href="#"
              class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl px-1 py-1"
            >
              <img
                src="/src/assets/img/tiktok.svg"
                alt="TikTok"
                class="size-5 object-cover"
              />

              mateo mercado
            </a>
          </li>

          <li>
            <a
              href="#"
              class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl px-1 py-1"
            >
              <img
                src="/src/assets/img/facebook.svg"
                alt="Facebook"
                class="size-5 object-cover"
              />

              mateo mercado
            </a>
          </li>

        </ul>
      </div>
    </article>

  </section>

  <!-- Sección inferior -->
  <section
    class="absolute left-1/2 -translate-x-1/2 -bottom-20 md:-bottom-10 w-[calc(100%-2rem)] md:w-2/3 h-20 bg-white rounded-2xl shadow-sm text-center flex items-center justify-center overflow-hidden"
  >
    <ul class="flex gap-2 w-full h-full items-center justify-center">

      <!-- Seguidores -->
      <li
        class="flex gap-2 items-center justify-center cursor-pointer h-full w-full hover:bg-gray-100"
      >
        <img
          src="/src/assets/img/seguidores.svg"
          alt="Seguidores"
          class="size-6 object-cover hidden sm:inline"
        />

        <div>
          <h2 class="font-bold">1000</h2>
          Seguidores
        </div>
      </li>

      <!-- Seguidos -->
      <li
        class="flex gap-2 items-center justify-center cursor-pointer h-full w-full hover:bg-gray-100"
      >
        <img
          src="/src/assets/img/seguidos.svg"
          alt="Seguidos"
          class="size-6 object-cover hidden sm:inline"
        />

        <div>
          <h2 class="font-bold">1000</h2>
          Seguidos
        </div>
      </li>

      <!-- Reseñas -->
      <li
        class="flex gap-2 items-center justify-center cursor-pointer h-full w-full hover:bg-gray-100"
      >
        <img
          src="/src/assets/img/reseñas.svg"
          alt="Reseñas"
          class="size-8 object-cover hidden sm:inline"
        />

        <div>
          <h2 class="font-bold">10</h2>
          Reseñas
        </div>
      </li>

      <!-- Itinerarios -->
      <li
        class="flex gap-2 items-center justify-center cursor-pointer h-full w-full hover:bg-gray-100"
      >
        <img
          src="/src/assets/img/itinerarios.svg"
          alt="Itinerarios"
          class="size-8 object-cover hidden sm:inline"
        />

        <div>
          <h2 class="font-bold">5</h2>
          Itinerarios
        </div>
      </li>

    </ul>
  </section>

</main>

    <footer class="w-full h-full mt-25 flex flex-col items-center">
      <!-- Contenedor de secciones -->
      <div class="grid grid-cols-1 gap-8 md:w-2/3">
        <section
          class="bg-white shadow-sm rounded-lg p-6 border border-gray-100"
        >
          <div class="flex gap-2 items-center">
            <img
              src="/src/assets/img/star.svg"
              alt="Reseñas"
              class="size-6 object-cover"
            />
            <h2 class="text-xl font-bold">Reseñas recientes</h2>
          </div>
          <!-- Aquí van las tarjetas de itinerarios -->

          <figure
            id="reseñas"
            class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2"
          ></figure>
        </section>

        <section
          class="bg-white shadow-sm rounded-lg p-6 border border-gray-100"
        >
          <div class="flex gap-2 items-center">
            <img
              src="/src/assets/img/map.svg"
              alt="Mapas"
              class="size-6 object-cover"
            />
            <h2 class="text-xl font-bold">Itinerarios recientes</h2>
          </div>
          <!-- Aquí van las tarjetas de reseñas -->
          <figure
            id="itinerarios"
            class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2"
          ></figure>
        </section>
      </div>
    </footer> 

  

    `;
}

export function perfilEvents() {

//Mostrar menú de navegación en versión móvil
  NavbarEvents()
  // FIN

  const placeholder = document.getElementById("btn-follow");
  placeholder.replaceWith(FollowButton());


  const reseñasContainer = document.getElementById("reseñas");
  reseñasContainer.innerHTML=cardReseña()

   const itinerariosContainer = document.getElementById("itinerarios");
  itinerariosContainer.innerHTML=cadItinerario()





  /* try {
      const sitios = await getSitiosDestacados();
      if (sitios) {
        sitiosContainer.innerHTML = sitios.map(sitio => SITIOS_DESTACADOS()).join("");
      }
    } catch (error) {
      alert(error.message);
    } */
}
