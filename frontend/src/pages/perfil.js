import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR, NavbarEvents } from "../components/nav_bar.component.js";

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
    <div class="absolute bottom-4 md:left-20 md:right-0 flex items-center gap-4 h-60">
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
    <article class="absolute top-0 left-0 w-full h-60  bg-black/50 text-white">
    <div class=" absolute top-8 left-51 md:top-16 md:left-71 right-0">
    
      <div class="flex flex-wrap md:flex-nowrap items-center ">
        <h2 class="font-bold text-xl md:text-2xl md:pr-3">Mateo Mercado</h2>
        <span class="bg-green-600 font-bold text-xs rounded-4xl px-3 py-1">
          Explorador ✧
        </span>
      </div>
      <p class="text-xs mt-1">@Matero123_sew</p>
      <p class="text-xs mt-2 max-w-70">
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto...
      </p>

      <!-- Redes sociales -->
      <ul class="flex flex-wrap md:flex-nowrap gap-2 pt-2 w-full ">
        <li>
          <a href="#" class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl px-1 py-1">
            <img src="/src/assets/img/instagram.svg" alt="Instagram" class="size-5 object-cover" />
            mateo mercado
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl px-1 py-1">
            <img src="/src/assets/img/tiktok.svg" alt="TikTok" class="size-5 object-cover" />
            mateo mercado
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl px-1 py-1">
            <img src="/src/assets/img/facebook.svg" alt="Facebook" class="size-5 object-cover" />
            mateo mercado
          </a>
        </li>
      </ul>
      </div>
    </article>
  </section>

  <!-- Sección inferior -->
  <section class="absolute -bottom-10 md:left-50 md:right-0 w-2/3 h-20 bg-white rounded-2xl shadow-sm text-center flex items-center justify-center">
    <p class="text-sm">nsknsdf</p>
  </section>
</main>

  

    `;
}

export function perfilEvents() {

//Mostrar menú de navegación en versión móvil
  NavbarEvents()
  // FIN


}
