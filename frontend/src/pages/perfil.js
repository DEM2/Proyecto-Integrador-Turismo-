import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.component.js";

export function perfil() {
  return `
  ${NAV_BAR()}
    <main> 
      <section class="h-48 grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-2 ">

      <aside class="bg-amber-50 flex gap-1">
        <img
            src="/src/assets/img/familias.webp"
            class="max-h-full rounded-full border-4 border-amber-50  object-cover"
            alt=""
          />
          <article class="w-full">
          <h2>
            Mateo Mercado
          </h2>
          <spam class="text-green-600">Explorador 🌴</spam>
          </article>
      </aside>
        

        <img
          src="/src/assets/img/hero3.png"
          class="w-full max-h-full object-cover"
          alt=""
        />
      </section>
    
    </main>
  

    `;
}

export function perfilEvents() {
  
  


}
