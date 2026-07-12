import { navigateTo } from "../router/router";
import { postUser } from "../services/register.service.js";
import { NAV_BAR } from "../components/nav_bar.component.js";

export function event() {
  return `
  ${NAV_BAR()}
    <main class="w-full flex flex-col gap-4 font-sans">
      <section class="  HERO      w-full h-120 relative">
        <img
          class="w-full h-full object-cover"
          src="/src/assets/img/hero3.png"
          alt="Hero Image"
        />
        <p class="absolute bottom-1/2 left-1/9 text-blue-950">
          <span class="font-medium text-5xl"> Descubre la magia. </span><br />
          <span class="font-extralight text-lg">
            Explora, vive y disfruta todo lo que <br />
            nuestra ciudad tiene <b>para ti</b>.
          </span>
        </p>
      </section>
  

    `;
}

export function eventEvents() {
  
  const botonIniciarSesion = document.getElementById("boton_iniciarsesion");
  const botonRegistrarse = document.getElementById("boton_registrarse");
  const navInicio = document.getElementById("nav-inicio");
  const navEventos = document.getElementById("nav-eventos");
  

  navInicio.addEventListener("click", () => {
    navigateTo("/");
  });

  botonIniciarSesion.addEventListener("click", () => {
    navigateTo("/login");
  });

  botonRegistrarse.addEventListener("click", () => {
    navigateTo("/register");
  });
  navEventos.addEventListener("click", () => {
    navigateTo("/event");
  });

}
