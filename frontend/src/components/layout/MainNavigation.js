import { navigateTo } from "../../router/AppRouter.js";
import { clearSession, getSession } from "../../services/authService.js";
import { openCreateItineraryModal } from "./IntineraryModal.js";


export function renderMainNavigation() {
  const session = getSession();
  const user = session?.user;
  const inicial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return `
    <header
      class=" NAVEGACION  font-sans text-blue-950 flex items-center justify-between h-20 pl-4 sm:pl-6 md:pl-10 pr-2 sm:pr-4 md:pr-8 bg-gray-50"
    >
      <figure id= "logo_container" class="w-60 flex items-center gap-4">
        <h1 class="text-3xl font-bold max-md:text-2xl">Barranquilla</h1>
        <img id ="logo" class="w-32 max-md:w-28" src="/src/assets/logos/logo.png" alt="Logo">
      </figure>
      <nav class="">
        <button
          id="boton_menu"
          type="button"
          aria-label="Abrir menú"
          aria-controls="mobile-navigation"
          aria-expanded="false"
          class="hidden size-8 cursor-pointer items-center justify-center max-md:flex"
        >
          <img class="size-8" src="/src/assets/icons/menu.svg" alt="">
        </button>

        <ul 
        id="navegacion"
        class="flex items-center gap-4 font-medium max-md:hidden">

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

    <div id="mobile-navigation" class="mobile-navigation hidden" aria-hidden="true">
      <button id="mobile-menu-backdrop" class="mobile-menu-backdrop" type="button" aria-label="Cerrar menú"></button>
      <aside class="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <div class="mobile-menu-header">
          <div class="mobile-menu-brand" aria-hidden="true">
            <span>Barranquilla</span>
            <img src="/src/assets/logos/logo.png" alt="">
          </div>
          <button id="boton_equis" type="button" class="mobile-menu-close" aria-label="Cerrar menú">
            <img class="size-7" src="/src/assets/icons/equis.svg" alt="">
          </button>
        </div>
        <nav class="mobile-menu-links" aria-label="Navegación móvil">
          <button id="mobile-nav-inicio" type="button">Inicio</button>
          <button id="mobile-nav-destinos" type="button">Destinos</button>
          <button id="mobile-nav-eventos" type="button">Eventos</button>
          <button id="mobile-nav-perfil" type="button">Mi perfil</button>
        </nav>
      </aside>
    </div>
  `;
};

export function initializeMainNavigationEvents() {
   //Mostrar menú de navegación en versión móvil
  const boton = document.getElementById("boton_menu");
  const equis = document.getElementById("boton_equis");
  const mobileNavigation = document.getElementById("mobile-navigation");
  const mobileBackdrop = document.getElementById("mobile-menu-backdrop");
  const logo = document.getElementById("logo_container")

  logo.addEventListener("click", () => {
    navigateTo("/");
  });

  
  boton.addEventListener("click", abrirMenuMovil);
  equis.addEventListener("click", cerrarMenuMovil);
  mobileBackdrop.addEventListener("click", cerrarMenuMovil);

  function abrirMenuMovil() {
    mobileNavigation.classList.remove("hidden");
    mobileNavigation.setAttribute("aria-hidden", "false");
    boton.setAttribute("aria-expanded", "true");
  }

  function cerrarMenuMovil() {
    mobileNavigation.classList.add("hidden");
    mobileNavigation.setAttribute("aria-hidden", "true");
    boton.setAttribute("aria-expanded", "false");
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      cerrarMenuMovil();
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

  document.getElementById("mobile-nav-inicio").addEventListener("click", () => {
    cerrarMenuMovil();
    navigateTo("/");
  });

  document.getElementById("mobile-nav-destinos").addEventListener("click", () => {
    cerrarMenuMovil();
    navigateTo("/destinos");
  });

  document.getElementById("mobile-nav-eventos").addEventListener("click", () => {
    cerrarMenuMovil();
    navigateTo("/event");
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
 
     openCreateItineraryModal()
      
    });

    const irAPerfil = () => {
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
    };

    document.getElementById("menu_perfil_link").addEventListener("click", irAPerfil);
    document.getElementById("mobile-nav-perfil").addEventListener("click", () => {
      cerrarMenuMovil();
      irAPerfil();
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

    document.getElementById("mobile-nav-perfil").addEventListener("click", () => {
      cerrarMenuMovil();
      navigateTo("/login");
    });
  }
}
