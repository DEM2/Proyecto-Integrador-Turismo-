import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.component.js";

export function perfil() {
  return `
  ${NAV_BAR()}
    <main> 
      <section class="h-48 grid lg:grid-cols-3 lg:grid-rows-1 grid-cols-1 grid-rows-2 ">

      
      <aside class="bg-amber-50 flex gap-1 pl-2  ">
        <img
            src="/src/assets/img/familias.webp"
            class="size-48 rounded-full shrink-0 border-4 border-white  object-cover "
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
          class="w-full h-full object-cover lg:col-span-2 "
          alt=""
        />
      </section>
    
    </main>
  

    `;
}

export function perfilEvents() {
  
  


}
