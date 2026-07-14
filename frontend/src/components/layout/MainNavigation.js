import { navigateTo } from "../../router/AppRouter.js";
import { clearSession, getSession } from "../../services/authService.js";

export function renderMainNavigation() {
  const session = getSession();
  const user = session?.user;
  const inicial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return `
    <header
      class=" NAVEGACION  font-sans text-blue-950 flex items-center justify-between h-20 pl-4 sm:pl-6 md:pl-10 pr-2 sm:pr-4 md:pr-8 bg-gray-50"
    >
      <figure class="w-60 flex items-center gap-4">
        <h1 class="text-3xl font-bold max-md:text-2xl">Barranquilla</h1>
        <img class="w-32 max-md:w-28" src="/src/assets/logos/logo.png" alt="Logo">
      </figure>
      <nav class="">
      <img 
          id="boton_menu"
          class="  size-8 cursor-pointer max-lg:block hidden"
          src="/src/assets/icons/menu.svg">
          
        <ul 
        id="navegacion"
        class="flex items-center gap-4 font-medium  max-lg:hidden">
          <img 
          id="boton_equis"
          class="  size-8 cursor-pointer hidden max-lg:block "
          src="/src/assets/icons/equis.svg">

          <li><a id="nav-inicio" class="hover:text-blue-800 cursor-pointer" >Inicio</a></li>
          <li><a id="nav-destinos" class="hover:text-blue-800 cursor-pointer" >Destinos</a></li>
          <li><a id="nav-eventos" class="hover:text-blue-800 cursor-pointer" >Eventos</a></li>

          ${
            session
              ? `
          <li class="relative">
            <button
              id="boton_perfil"
              type="button"
              class="flex items-center justify-center size-11 rounded-full bg-blue-900 text-white font-bold text-lg cursor-pointer hover:bg-blue-800 transition"
            >
              ${inicial}
            </button>

            <div
              id="menu_perfil"
              class="hidden absolute right-0 top-16 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 text-left"
            >
              <div class="px-5 py-3 border-b border-gray-100">
                <p class="text-base font-semibold truncate">${user?.name ?? ""} ${user?.last_name ?? ""}</p>
                <p class="text-sm text-gray-500 truncate">${user?.email ?? ""}</p>
              </div>

              <a id="menu_itinerario" class="block px-5 py-3 text-base hover:bg-gray-100 cursor-pointer">
                Crear itinerario
              </a>
              <a id="menu_perfil_link" class="block px-5 py-3 text-base hover:bg-gray-100 cursor-pointer">
                Perfil
              </a>
              <a id="menu_cerrar_sesion" class="block px-5 py-3 text-base text-red-600 hover:bg-red-50 cursor-pointer">
                Cerrar sesión
              </a>
            </div>
          </li>
          `
              : `
          <li>
             <a id="boton_iniciarsesion" class="hover:text-blue-800 cursor-pointer" >Iniciar Sesión</a>
          </li>
          <li >
             <a id="boton_registrarse" class="border-2 border-blue-900  rounded-lg p-1.5 pl-4 pr-4 cursor-pointer hover:bg-blue-900 hover:text-white " >Registrarse</a>
          </li>
          `
          }
        </ul>
      </nav>
    </header>
  `;
};

export function initializeMainNavigationEvents() {
   //Mostrar menú de navegación en versión móvil
  const boton = document.getElementById("boton_menu");
  const navegacion = document.getElementById("navegacion");
  const equis = document.getElementById("boton_equis");

  boton.addEventListener("click", funcionMenu);
  equis.addEventListener("click", funcionMenu);

  function funcionMenu() {
    navegacion.classList.toggle("active");
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navegacion.classList.remove("active");
    }
  });
  // FIN

  // Funcionalidad de navegación entre páginas

  const navInicio = document.getElementById("nav-inicio");
  const navEventos = document.getElementById("nav-eventos");
  const navDestinos = document.getElementById("nav-destinos");

  navInicio.addEventListener("click", () => {
    navigateTo("/");
  });

  navEventos.addEventListener("click", () => {
    navigateTo("/event");
  });

  navDestinos.addEventListener("click", () => {
    navigateTo("/destinos");
  });
  // FIN

  const session = getSession();

  if (session) {
    // Funcionalidad del menú de perfil (usuario logueado)
    const botonPerfil = document.getElementById("boton_perfil");
    const menuPerfil = document.getElementById("menu_perfil");

    botonPerfil.addEventListener("click", (event) => {
      event.stopPropagation();
      menuPerfil.classList.toggle("hidden");
    });

    // Cerrar el menú al hacer click fuera de él.
    // Se guarda el handler en window para no acumular listeners
    // en document cada vez que se vuelve a renderizar el navbar.
    if (window.__cerrarMenuPerfilHandler) {
      document.removeEventListener("click", window.__cerrarMenuPerfilHandler);
    }
    window.__cerrarMenuPerfilHandler = (event) => {
      if (
        !menuPerfil.classList.contains("hidden") &&
        !menuPerfil.contains(event.target) &&
        event.target !== botonPerfil
      ) {
        menuPerfil.classList.add("hidden");
      }
    };
    document.addEventListener("click", window.__cerrarMenuPerfilHandler);

    document.getElementById("menu_itinerario").addEventListener("click", () => {
      menuPerfil.classList.add("hidden");
      navigateTo("/itinerario");
    });

    document.getElementById("menu_perfil_link").addEventListener("click", () => {
      menuPerfil.classList.add("hidden");

      const userRole = session?.user?.role || session?.role;

      if (userRole === "explorador") {
        navigateTo("/perfilexplorador");
      } else if (userRole === "organizador") {
        navigateTo("/perfilorganizador");
      } else {
        // Si el rol no está definido o no coincide, se envía a inicio
        // para evitar redirigir a una ruta inexistente.
        navigateTo("/");
      }
    });

    document.getElementById("menu_cerrar_sesion").addEventListener("click", () => {
      clearSession();
      navigateTo("/");
    });

  } else {
    // Funcionalidad de invitado (sin sesión)
    const botonIniciarSesion = document.getElementById("boton_iniciarsesion");
    const botonRegistrarse = document.getElementById("boton_registrarse");

    botonIniciarSesion.addEventListener("click", () => {
      navigateTo("/login");
    });

    botonRegistrarse.addEventListener("click", () => {
      navigateTo("/register");
    });
  }
}
