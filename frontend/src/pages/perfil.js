import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.component.js";

export function perfil() {
  return `
  ${NAV_BAR()}
    <main> 
        <section class="imagen h-48 relative"> 
            <img
          class="w-full h-full object-cover "
          src="/src/assets/img/hero3.png"
          alt="Hero Image"
        />


    <img
          class="size-32 object-cover rounded-full border-4 border-amber-50 absolute top-40 left-10 "
          src="/src/assets/img/familias.webp"
          alt="Hero Image"
        />
        </section>

        <section>
        
        </section>
    
    </main>
  

    `;
}

export function perfilEvents() {
  
  


}
