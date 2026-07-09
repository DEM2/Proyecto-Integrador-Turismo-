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
          <aside class="bg-amber-100 rounded-2xl p-2 cursor-pointer hover:bg-amber-200 text-center"> Instagram <br> Facebook <br> Tiktok</aside>
          <article class="w-full flex flex-col items-center justify-center">
          
          <h2 class="text-lg font-medium ">
            Mateo Mercado
            <span class="text-xs block font-normal text-center">@Matooo_23432
            
            </span>
          </h2>
          <span class="text-green-600 font-medium ">Explorador 🌴</span>
          </article>

          <aside class="bg-amber-100 rounded-2xl p-2 cursor-pointer hover:bg-amber-200 text-center "> Seguir </aside>
         
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
