import { navigateTo } from "../../router/AppRouter.js";
import { clearSession, getSession } from "../../services/authService.js";
import { openCreateItineraryModal } from "./IntineraryModal.js";


export function renderMainNavigation() {
  const session = getSession();
  const user = session?.user;
  const inicial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";
  const currentPath = window.location.pathname;
  const navigationItems = [
    { id: "inicio", label: "Inicio", path: "/" },
    { id: "destinos", label: "Lugares", path: "/destinos" },
    { id: "eventos", label: "Eventos", path: "/event" },
  ];

  const isActiveRoute = (path) => currentPath === path;
  const renderDesktopNavigationItem = ({ id, label, path }) => {
    const isActive = isActiveRoute(path);

    return `
      <li>
        <a
          id="nav-${id}"
          href="${path}"
          class="relative cursor-pointer py-2 transition-colors duration-200 ${isActive
        ? "text-blue-600 after:absolute after:left-1/2 after:-bottom-0.5 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-blue-600"
        : "text-blue-950 hover:text-blue-600"
      }"
          ${isActive ? 'aria-current="page"' : ""}
        >${label}</a>
      </li>
    `;
  };

  const renderMobileNavigationItem = ({ id, label, path }) => {
    const isActive = isActiveRoute(path);

    return `
      <button
        id="mobile-nav-${id}"
        type="button"
        class="${isActive
        ? "!bg-blue-50 !text-blue-600"
        : "!bg-transparent !text-blue-950 hover:!bg-slate-50 hover:!text-blue-600"
      } transition-colors duration-200"
        ${isActive ? 'aria-current="page"' : ""}
      >${label}</button>
    `;
  };

  return `
    <header
      class="NAVEGACION relative z-50 flex h-20 items-center justify-between bg-white pl-4 pr-2 font-sans text-blue-950 shadow-[0_8px_30px_rgba(15,23,42,0.06)] max-md:h-[76px] max-md:px-[18px] sm:h-[5.5rem] sm:pl-6 sm:pr-4 md:px-10 md:max-lg:px-6"
    >
      <figure id= "logo_container" class="flex w-60 items-center gap-4 max-md:w-auto max-md:gap-2 md:max-lg:w-auto md:max-lg:gap-3">
        <h1 class="text-3xl font-bold max-md:text-xl md:max-lg:text-2xl">Barranquilla</h1>
        <img id ="logo" class="w-32 max-md:w-22 md:max-lg:w-24" src="/src/assets/logos/logo.png" alt="Logo">
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
        class="flex items-center gap-6 font-medium max-md:hidden md:max-lg:gap-[0.85rem] md:max-lg:text-sm lg:gap-9">

          ${navigationItems.map(renderDesktopNavigationItem).join("")}

          ${session
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

              ${(session?.user?.role || session?.role) === "explorador"
                  ? `
                    <a
                      id="menu_itinerario"
                      class="block px-5 py-3 text-base hover:bg-gray-100 cursor-pointer"
                    >
                      Crear itinerario
                    </a>
                  `
                  : ""
              }
              <a id="menu_perfil_link" class="block px-5 py-3 text-base hover:bg-gray-100 cursor-pointer">
                ${(session?.user?.role || session?.role) === "administrador"
                      ? "Dashboard"
                      : "Perfil"
                    }
              </a>
              <a id="menu_cerrar_sesion" class="block px-5 py-3 text-base text-red-600 hover:bg-red-50 cursor-pointer">
                Cerrar sesión
              </a>
            </div>
          </li>
          `
      : `
          <li>
             <a id="boton_iniciarsesion" class="cursor-pointer transition-colors duration-200 hover:text-blue-600" >Iniciar Sesión</a>
          </li>
          <li >
             <a id="boton_registrarse" class="cursor-pointer rounded-lg border-2 border-blue-900 px-4 py-1.5 transition-colors duration-200 hover:bg-blue-900 hover:text-white" >Registrarse</a>
          </li>
          `
    }
        </ul>
      </nav>
    </header>

    <div id="mobile-navigation" class="mobile-navigation fixed inset-0 z-60 invisible overflow-hidden pointer-events-none transition-[visibility] delay-[280ms] [&.is-open]:visible [&.is-open]:pointer-events-auto [&.is-open]:delay-0 motion-reduce:transition-none" aria-hidden="true">
      <button id="mobile-menu-backdrop" class="mobile-menu-backdrop absolute inset-0 w-full border-0 bg-slate-900/45 opacity-0 transition-opacity duration-[220ms] ease-out [.mobile-navigation.is-open_&]:opacity-100 motion-reduce:transition-none" type="button" aria-label="Cerrar menú"></button>
      <aside class="mobile-menu-drawer absolute top-0 right-0 flex h-full w-4/5 max-w-[420px] flex-col bg-[#fcfcfc] shadow-[-12px_0_32px_rgb(15_23_42_/_20%)] translate-x-full transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.mobile-navigation.is-open_&]:translate-x-0 motion-reduce:transition-none" role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <div class="mobile-menu-header flex h-[88px] items-center justify-between border-b border-gray-200 px-5">
          <div class="mobile-menu-brand flex items-center gap-2 text-[18px] font-bold text-[#17316f]" aria-hidden="true">
            <span>Barranquilla</span>
            <img class="w-[82px]" src="/src/assets/logos/logo.png" alt="">
          </div>
          <button id="boton_equis" type="button" class="mobile-menu-close flex cursor-pointer border-0 bg-transparent p-0" aria-label="Cerrar menú">
            <img class="size-7" src="/src/assets/icons/equis.svg" alt="">
          </button>
        </div>
        <nav class="mobile-menu-links flex flex-col gap-1 px-3 py-4 [&_button]:min-h-[52px] [&_button]:cursor-pointer [&_button]:rounded-[10px] [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-4 [&_button]:text-left [&_button]:font-inherit [&_button]:font-medium [&_button]:text-[#08214d] [&_button:first-child]:bg-[#f3f7ff] [&_button:first-child]:text-blue-600" aria-label="Navegación móvil">
          ${navigationItems.map(renderMobileNavigationItem).join("")}
          <button id="mobile-nav-perfil" type="button">
              ${
                (session?.user?.role || session?.role) === "administrador"
                  ? "Dashboard"
                  : "Mi perfil"
              }
            </button>
          ${session?.user?.role === "explorador" || session?.role === "explorador"
      ? `<button id="mobile-nav-itinerario" type="button" class="text-left hover:text-blue-800">Crear itinerario</button>`
      : ""
    }
          ${session
      ? `<button id="mobile-nav-logout" type="button" class="text-left text-red-600 hover:text-red-800">Cerrar sesión</button>`
      : ""
    }
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
    mobileNavigation.classList.add("is-open");
    mobileNavigation.setAttribute("aria-hidden", "false");
    boton.setAttribute("aria-expanded", "true");
  }

  function cerrarMenuMovil() {
    mobileNavigation.classList.remove("is-open");
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

  navInicio.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/");
  });

  navEventos.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/event");
  });

  navDestinos.addEventListener("click", (event) => {
    event.preventDefault();
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

   const menuItinerario = document.getElementById("menu_itinerario");

if (menuItinerario) {
  menuItinerario.addEventListener("click", () => {
    menuPerfil.classList.add("hidden");
    openCreateItineraryModal();
  });
}

    const irAPerfil = () => {
      menuPerfil.classList.add("hidden");

      const userRole = session?.user?.role || session?.role;

      if (userRole === "explorador") {
        navigateTo("/perfilexplorador");
      } else if (userRole === "organizador") {
        navigateTo("/perfilorganizador");
      } else if (userRole === "administrador") {
        navigateTo("/dashboard");
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

    const mobileItineraryButton = document.getElementById("mobile-nav-itinerario");
    if (mobileItineraryButton) {
      mobileItineraryButton.addEventListener("click", () => {
        cerrarMenuMovil();
        openCreateItineraryModal();
      });
    }

    const mobileLogoutButton = document.getElementById("mobile-nav-logout");
    if (mobileLogoutButton) {
      mobileLogoutButton.addEventListener("click", () => {
        cerrarMenuMovil();
        clearSession();
        navigateTo("/", { force: true });
      });
    }

    document.getElementById("menu_cerrar_sesion").addEventListener("click", () => {
      clearSession();
      navigateTo("/", { force: true });
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
