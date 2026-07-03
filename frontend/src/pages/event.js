import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
import { NAV_BAR } from "../components/nav_bar.js";

export function event() {
  return `
  ${NAV_BAR()}
  

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
