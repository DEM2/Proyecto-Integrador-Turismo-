import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.component.js";

export function perfil() {
  return `
  ${NAV_BAR()}
    <main class="relative w-full h-60">
  <!-- Hero principal -->
  <section class="relative w-full h-full">
    <img 
      src="/src/assets/img/hero3.png" 
      alt="Imagen principal" 
      class="w-full h-full object-cover"
    />

    <!-- Perfil superpuesto -->
    <div class="absolute bottom-4 left-20 flex items-center gap-4">
      <img 
        src="/src/assets/img/familias.webp" 
        alt="Foto de perfil" 
        class="size-50 rounded-full border-4 border-white object-cover z-10"
      />
      <img 
        src="/src/assets/img/explore2.png" 
        alt="Icono explorador" 
        class="size-13 object-contain absolute bottom-1 left-35 z-20"
      />
    </div>

    <!-- Información del usuario -->
    <article class="absolute top-13 left-69 w-1/3 p-3 rounded-3xl bg-black/50 text-white">
      <div class="flex items-center">
        <h2 class="font-bold text-2xl pr-3">Mateo Mercado</h2>
        <span class="bg-green-600 font-bold text-xs rounded-4xl px-3 py-1">
          Explorador ✧
        </span>
      </div>
      <p class="text-xs mt-1">@Matero123_sew</p>
      <p class="text-xs mt-2">
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto...
      </p>

      <!-- Redes sociales -->
      <ul class="flex gap-2 mt-3 bg-black/50 rounded-2xl items-center justify-center p-2">
        <li>
          <a href="#" class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl p-1 ">
            <img src="/src/assets/img/instagram.svg" alt="Instagram" class="size-5 object-cover" />
            mateo mercado
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl p-1">
            <img src="/src/assets/img/tiktok.svg" alt="TikTok" class="size-5 object-cover" />
            mateo mercado
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-1 text-xs hover:bg-black/20 hover:rounded-2xl p-1">
            <img src="/src/assets/img/facebook.svg" alt="Facebook" class="size-5 object-cover" />
            mateo mercado
          </a>
        </li>
      </ul>
    </article>
  </section>

  <!-- Sección inferior -->
  <section class="absolute -bottom-10 left-50 w-2/3 h-20 bg-white rounded-2xl shadow-sm text-center flex items-center justify-center">
    <p class="text-sm">nsknsdf</p>
  </section>
</main>

  

    `;
}

export function perfilEvents() {




}
