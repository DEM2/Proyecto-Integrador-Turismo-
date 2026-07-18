import { navigateTo, renderCurrentRoute } from "../../router/AppRouter.js";
import { clearSession } from "../../services/authService.js";
import {
  renderAdminDashboardAllEvents,
  renderAdminDashboardAllEventsEvents,
} from "./adminDashboardAllEvents.js";
import { renderAdminDashboardAllOrganizerRequests, renderAdminDashboardAllOrganizerRequestsEvents } from "./adminDashboardAllOrganizerRequests.js";
import {
  renderAdminDashboardAllPlaces,
  renderAdminDashboardAllPlacesEvents,
} from "./adminDashboardAllPlaces.js";
import {
  renderAdminDashboardAllReviews,
  renderAdminDashboardAllReviewsEvents,
} from "./adminDashboardAllReviews.js";
import {
  renderAdminDashboardAllUsers,
  renderAdminDashboardAllUsersEvents,
} from "./adminDashboardAllUsers.js";
import { openAdminDashboardCreatePlaceModal } from "./adminDashboardCreatePlaceModal.js";

const activeSidebarClasses = [
  "bg-blue-600",
  "text-white",
  "shadow-lg",
  "shadow-blue-950/20",
  "hover:bg-blue-500",
];
const inactiveSidebarClasses = [
  "text-slate-200",
  "hover:bg-white/10",
  "hover:text-white",
];

function selectAdminSidebarItem(selectedItem) {
  const sidebarItems = document.querySelectorAll("[data-admin-sidebar-item]");

  sidebarItems.forEach((item) => {
    const isSelected = item === selectedItem;

    item.classList.remove(...(isSelected ? inactiveSidebarClasses : activeSidebarClasses));
    item.classList.add(...(isSelected ? activeSidebarClasses : inactiveSidebarClasses));

    if (isSelected) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

export function renderAdminDashboardSidebar() {
  return `
    <aside class="flex min-h-screen flex-col bg-[#06264a] px-5 py-6 text-white lg:h-screen lg:overflow-y-auto">
      <a href="/" class="mb-8 flex cursor-pointer items-center gap-3" aria-label="Ir al inicio de Barranquilla Explora">
        
        <span class="text-lg font-extrabold leading-tight tracking-wide">
          BARRANQUILLA<br />
          EXPLORA
        </span>
      </a>

      <nav aria-label="Navegacion del panel de administracion" class="flex flex-1 flex-col">
        <p class="mb-3 text-xs font-semibold uppercase text-slate-300">Panel de administracion</p>

        <ul class="space-y-2 text-sm font-semibold">
          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-dashboard="true" aria-current="page" class="flex cursor-pointer items-center gap-3 rounded-lg bg-blue-600 px-4 py-2.5 text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m3 10 9-7 9 7" />
                <path d="M5 10v10h14V10" />
                <path d="M9 20v-6h6v6" />
              </svg>
              Dashboard
            </a>
          </li>

          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-users="true" class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Usuarios
            </a>
          </li>

          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-events="true" class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
              </svg>
              Eventos
            </a>
          </li>

          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-places="true" class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Sitios
            </a>
          </li>

          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-create-place="true" class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Crear sitio
            </a>
          </li>

          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-reviews="true" class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
              </svg>
              Reseñas
            </a>
          </li>

          <li>
            <a href="#" data-admin-sidebar-item data-admin-sidebar-requests="true" class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white">
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="8" y="2" rx="1" />
              </svg>
              Solicitudes de organizador
            </a>
          </li>
        </ul>

        <a id="logout-btn" class="mt-auto flex cursor-pointer items-center gap-3 rounded-lg bg-white/10 px-4 py-2.5 text-xl font-bold text-gray-50 transition hover:text-gray-900 hover:bg-white">
          <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          Cerrar sesion
        </a>
      </nav>
    </aside>
  `;
}


export function renderAdminDashboardSidebarEvents(){
    const loginbtn = document.getElementById("logout-btn");
    const dashboardLink = document.querySelector("[data-admin-sidebar-dashboard='true']");
    const usersLink = document.querySelector("[data-admin-sidebar-users='true']");
    const eventsLink = document.querySelector("[data-admin-sidebar-events='true']");
    const placesLink = document.querySelector("[data-admin-sidebar-places='true']");
    const createPlaceLink = document.querySelector("[data-admin-sidebar-create-place='true']");
    const reviewsLink = document.querySelector("[data-admin-sidebar-reviews='true']");
    const requestsLink = document.querySelector("[data-admin-sidebar-requests='true']");

    loginbtn.addEventListener("click", () => {
      clearSession();
      navigateTo("/")
    });

    dashboardLink.addEventListener("click", async (event) => {
      event.preventDefault();
      await renderCurrentRoute();
    });

   

    usersLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      const usersContent = await renderAdminDashboardAllUsers();
      dashboardContent.innerHTML = `<div class="dashboard-content-transition flex min-h-0 flex-1 flex-col">${usersContent}</div>`;
      selectAdminSidebarItem(usersLink);
      renderAdminDashboardAllUsersEvents();
    });

    eventsLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      const eventsContent = await renderAdminDashboardAllEvents();
      dashboardContent.innerHTML = `<div class="dashboard-content-transition flex min-h-0 flex-1 flex-col">${eventsContent}</div>`;
      selectAdminSidebarItem(eventsLink);
      renderAdminDashboardAllEventsEvents();
    });

    placesLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      const placesContent = await renderAdminDashboardAllPlaces();
      dashboardContent.innerHTML = `<div class="dashboard-content-transition flex min-h-0 flex-1 flex-col">${placesContent}</div>`;
      selectAdminSidebarItem(placesLink);
      renderAdminDashboardAllPlacesEvents();
    });

    createPlaceLink.addEventListener("click", (event) => {
      event.preventDefault();
      openAdminDashboardCreatePlaceModal();
      selectAdminSidebarItem(createPlaceLink);
    });

    reviewsLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      const reviewsContent = await renderAdminDashboardAllReviews();
      dashboardContent.innerHTML = `<div class="dashboard-content-transition flex min-h-0 flex-1 flex-col">${reviewsContent}</div>`;
      selectAdminSidebarItem(reviewsLink);
      renderAdminDashboardAllReviewsEvents();
    });

    requestsLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      const requestsContent = await renderAdminDashboardAllOrganizerRequests();
      dashboardContent.innerHTML = `<div class="dashboard-content-transition flex min-h-0 flex-1 flex-col">${requestsContent}</div>`;
      selectAdminSidebarItem(requestsLink);
      renderAdminDashboardAllOrganizerRequestsEvents();
    });
}
