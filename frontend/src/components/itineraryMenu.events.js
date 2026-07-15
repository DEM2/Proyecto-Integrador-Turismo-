import { renderItineraryOptionsMenu } from "./layout/ItineraryOptionsMenu.js";
import { getUserItineraries, addPlaceToItinerary } from "../services/itineraries.service.js";
import { openCreateItineraryModal } from "./layout/IntineraryModal.js";
import { getSession } from "../services/authService.js";

export function initializeItineraryMenus() {

  const session = getSession()

  document.querySelectorAll(".options-toggle-btn")
    .forEach(button => {

      button.addEventListener("click", async (e) => {

        e.stopPropagation();

        removeCurrentMenu();

        const placeId = button.dataset.placeId;
        console.log("hola",placeId)
        const placeName = button.dataset.placeName;

        const menu = document.createElement("div");

        menu.id = "itinerary-floating-menu";

        menu.className = "fixed z-[9999]";

        menu.innerHTML = `
                <div class="rounded-2xl bg-white shadow-2xl border p-5">
                    Cargando...
                </div>
            `;

        document.body.appendChild(menu);
        menu.addEventListener("click", (e) => {

          e.stopPropagation();

        });

        //-------------------------------------

        const rect = button.getBoundingClientRect();

        const menuWidth = 288;
        const margin = 12;

        let left = rect.right - menuWidth;

        if (left < margin) {

          left = margin;

        }

        if (left + menuWidth > window.innerWidth - margin) {

          left = window.innerWidth - menuWidth - margin;

        }

        let top = rect.bottom + 10;

        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;

        //-------------------------------------

        try {

          const response = await getUserItineraries(session.user.id);

          menu.innerHTML = renderItineraryOptionsMenu(response.data);

          initializeMenuEvents(menu, placeId, placeName);

        } catch {

          menu.innerHTML = `
                    <div class="rounded-xl bg-white shadow-xl border p-4 text-red-500">
                        Error cargando itinerarios
                    </div>
                `;

        }

      });

    });

  document.addEventListener("click", removeCurrentMenu);

}

function removeCurrentMenu() {

  document
    .getElementById("itinerary-floating-menu")
    ?.remove();

}

function initializeMenuEvents(menu, placeId, placeName) {

  menu
    .querySelectorAll(".itinerary-option")
    .forEach(button => {

      button.addEventListener("click", async () => {

        const itineraryId = button.dataset.itineraryId;
        console.log("inti",itineraryId)

        await addPlaceToItinerary(itineraryId, placeId);

        removeCurrentMenu();

        alert(`${placeName} agregado correctamente.`);

      });

    });

  menu
    .querySelector("#btn-create-itinerary-menu")
    ?.addEventListener("click", () => {

      removeCurrentMenu();

      openCreateItineraryModal();

    });

}