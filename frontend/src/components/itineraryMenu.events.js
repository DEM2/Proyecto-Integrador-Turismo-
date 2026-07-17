import { renderItineraryOptionsMenu } from "./layout/ItineraryOptionsMenu.js";
import { getUserItineraries, addPlaceToItinerary, addEventToItinerary } from "../services/itineraries.service.js";
import { openCreateItineraryModal } from "./layout/IntineraryModal.js";
import { getSession } from "../services/authService.js";

// Caché en memoria de los itinerarios del usuario.
// Evita pedirlos a la API cada vez que se abre el menú.
let itinerariesCache = null;
let itinerariesRequest = null;

function loadItineraries(userId, forceRefresh = false) {

  if (forceRefresh) {
    itinerariesCache = null;
    itinerariesRequest = null;
  }

  if (itinerariesCache) {
    return Promise.resolve(itinerariesCache);
  }

  if (!itinerariesRequest) {

    itinerariesRequest = getUserItineraries(userId)
      .then((response) => {
        itinerariesCache = response.data;
        return itinerariesCache;
      })
      .catch((error) => {
        // Si falla, permitimos reintentar en el próximo click
        console.error("Fallo al pedir itinerarios:", error);
        itinerariesRequest = null;
        throw error;
      });

  }

  return itinerariesRequest;

}

export function initializeItineraryMenus() {

  const session = getSession();

  // Precarga los itinerarios apenas se inicializa la página,
  // así el menú suele abrir ya con los datos listos.
  if (session?.user?.id) {

    loadItineraries(session.user.id).catch(() => {});

  }

  document.querySelectorAll(".options-toggle-btn")
    .forEach(button => {

      button.addEventListener("click", async (e) => {

        e.stopPropagation();

        removeCurrentMenu();

        const itemType = button.dataset.itemType || "place";
        const itemId = button.dataset.itemId;
        const itemName = button.dataset.itemName;

        const menu = document.createElement("div");

        menu.id = "itinerary-floating-menu";

        // Oculto mientras se arma y se mide, para no mostrar
        // parpadeos de "Cargando..." ni saltos de posición.
        menu.className = "fixed z-[9999] invisible";

        document.body.appendChild(menu);

        menu.addEventListener("click", (e) => {

          e.stopPropagation();

        });

        // Cierra el menú si el usuario hace scroll (en window o en
        // cualquier contenedor con scroll interno), ya que al ser
        // "fixed" no se reposiciona automáticamente respecto al botón.
        window.addEventListener("scroll", removeCurrentMenu, {
          capture: true,
          once: true,
        });

        try {

          const itineraries = await loadItineraries(session.user.id);

          menu.innerHTML = renderItineraryOptionsMenu(itineraries);

          initializeMenuEvents(menu, itemType, itemId, itemName);

        } catch (error) {

          console.error("Error cargando itinerarios:", error);

          menu.innerHTML = `
                    <div class="rounded-xl bg-white shadow-xl border p-4 text-red-500">
                        Error cargando itinerarios
                    </div>
                `;

        }

        positionMenu(menu, button);


        menu.classList.remove("invisible");
        
        
            

      });

    });

  document.addEventListener("click", removeCurrentMenu);

}

function positionMenu(menu, button) {

  const rect = button.getBoundingClientRect();

  const menuWidth = menu.offsetWidth || 288;
  const menuHeight = menu.offsetHeight;
  const margin = 12;

  // Horizontal: pegado al borde derecho del botón, sin salirse de pantalla
  let left = rect.right - menuWidth;

  if (left < margin) {

    left = margin;

  }

  if (left + menuWidth > window.innerWidth - margin) {

    left = window.innerWidth - menuWidth - margin;

  }

  // Vertical: abre hacia abajo si hay espacio, si no, hacia arriba
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  let top;

  if (spaceBelow >= menuHeight + margin || spaceBelow >= spaceAbove) {

    top = rect.bottom + 10;

    // Por si aún así no cabe completo, lo recorta contra el borde inferior
    if (top + menuHeight > window.innerHeight - margin) {

      top = window.innerHeight - menuHeight - margin;

    }

  } else {

    top = rect.top - menuHeight - 10;

    if (top < margin) {

      top = margin;

    }

  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

}

function removeCurrentMenu() {

  document
    .getElementById("itinerary-floating-menu")
    ?.remove();

}

function initializeMenuEvents(menu, itemType, itemId, itemName) {

  menu
    .querySelectorAll(".itinerary-option")
    .forEach(button => {

      button.addEventListener("click", async () => {

        if (button.disabled) {
          return;
        }

        button.disabled = true;

        const itineraryId = button.dataset.itineraryId;

        try {

          if (itemType === "event") {

            await addEventToItinerary(itineraryId, itemId);
            loadItineraries(getSession().user.id,true);
          } else {

            await addPlaceToItinerary(itineraryId, itemId);
            loadItineraries(getSession().user.id,true);
          }

          removeCurrentMenu();

          alert(`${itemName} agregado correctamente.`);

        } catch (error) {

          console.error("Error agregando al itinerario:", error);

          alert(error.message || "No fue posible agregar al itinerario.");
          button.disabled = false;

        }

      });

    });

  menu
    .querySelector("#btn-create-itinerary-menu")
    ?.addEventListener("click", () => {

      removeCurrentMenu();

      openCreateItineraryModal(() => {

        // Se creó un itinerario nuevo: invalidamos el caché
        // para que la próxima apertura del menú lo refleje.
        const session = getSession();

        if (session?.user?.id) {

          loadItineraries(session.user.id, true).catch(() => {});

        }

      });

    });

}
