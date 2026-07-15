import { renderItineraryOptionsMenu } from "./layout/ItineraryOptionsMenu.js";
import { getUserItineraries, addPlaceToItinerary } from "../services/itineraries.service.js";
import { openCreateItineraryModal } from "./layout/IntineraryModal.js";

export function initializeItineraryMenus() {

  const buttons = document.querySelectorAll(".options-toggle-btn");

  buttons.forEach((button) => {

    button.addEventListener("click", async (event) => {

      event.stopPropagation();

      const menu = button.parentElement.querySelector(".options-menu");

      // cerrar cualquier otro menú abierto
      document.querySelectorAll(".options-menu").forEach((m) => {
        if (m !== menu) {
          m.classList.add("hidden");
        }
      });

      // ocultar si ya estaba abierto
      if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        return;
      }

      const placeId = button.dataset.placeId;
      const placeName = button.dataset.placeName;

      menu.innerHTML = `<p class="px-4 py-3 text-sm">Cargando...</p>`;
      menu.classList.remove("hidden");

      try {

        const response = await getUserItineraries();

        const itineraries = response.data;

        menu.innerHTML = renderItineraryOptionsMenu(itineraries);

        initializeMenuEvents(menu, placeId, placeName);

      } catch (error) {

        menu.innerHTML = `
          <p class="px-4 py-3 text-red-500">
            Error al cargar itinerarios
          </p>
        `;

      }

    });

  });

  // cerrar al hacer click fuera
  document.addEventListener("click", () => {

    document.querySelectorAll(".options-menu").forEach((menu) => {
      menu.classList.add("hidden");
    });

  });

}

function initializeMenuEvents(menu, placeId, placeName) {

  const createButton = menu.querySelector("#create-itinerary-option");

  if (createButton) {

    createButton.addEventListener("click", () => {

      menu.classList.add("hidden");
      openCreateItineraryModal();

    });

  }

  menu.querySelectorAll("[data-itinerary-id]").forEach((button) => {

    button.addEventListener("click", async () => {

      const itineraryId = button.dataset.itineraryId;

      try {

        await addPlaceToItinerary(itineraryId, placeId);

        menu.classList.add("hidden");

        alert(`"${placeName}" agregado al itinerario.`);

      } catch (error) {

        alert("No fue posible agregar el lugar.");

      }

    });

  });

}