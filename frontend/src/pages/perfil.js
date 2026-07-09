import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.component.js";

export function perfil() {
  return `
  ${NAV_BAR()}
    <main> 
      <section class="h-60 w-full relative ">
        <img
          class="w-full h-full object-cover"
          src="/src/assets/img/hero3.png"
          alt="Hero Image"
        />
      
        <section class="absolute bottom-4 left-20 flex w-full ">
          <img
            class="size-50 rounded-full border-4 border-white object-cover z-10 "
            src="/src/assets/img/familias.webp"
            alt="Hero Image"
          />
          <div class="bg-black/40 text-white w-1/3 h-3/3.5 p-3 pl-22 rounded-3xl absolute top-5 left-30 z-0">
          <div class="flex items-center self-center">
            <h2 class="font-bold pr-3 text-2xl">
            Mateo Mercado
            
          </h2>
          <span class="bg-green-600 font-bold text-xs rounded-4xl p-1 pl-3 pr-3"> Explorador</span>
          </div>
          
          <p class="text-xs"> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500sdssssssssssssssssssssssssssssssssssssssssssssssssss. </p>
            <br>
            <div> @mateomercado</div>
          </div>
          
        </section>

        <section class="bg-white absolute -bottom-10 rounded-2xl h-20 left-50 w-1/2 text-center border-2">
      nsknsdf
      </section>
      </section>


      
    
    </main>
  

    `;
}

export function perfilEvents() {




}
