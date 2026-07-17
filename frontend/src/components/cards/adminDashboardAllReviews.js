import {
  getAdminDashboardAllReviews,
  hideAdminDashboardReview,
  showAdminDashboardReview,
} from "../../services/adminDashboard.service.js";
import { renderAdminDashboardReviewItem } from "./adminDashboardReviewItem.js";

export async function renderAdminDashboardAllReviews() {
  let reviews = [];

  try {
    reviews = await getAdminDashboardAllReviews();
  } catch (error) {
    return `
      <header class="mb-4 flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Resenas</h1>
          <p class="mt-1 text-base font-medium text-red-600 lg:text-sm">
            No se pudieron cargar las resenas.
          </p>
        </div>
      </header>
    `;
  }

  let reviewItems = "";

  if (reviews.length > 0) {
    reviewItems = reviews.map((review) => renderAdminDashboardReviewItem(review, true)).join("");
  } else {
    reviewItems = `
      <li class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
        No hay resenas para mostrar.
      </li>
    `;
  }

  return `
    <header class="mb-4 flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Resenas</h1>
        <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">
          Todas las resenas de sitios y eventos
        </p>
      </div>

    </header>

    <section class="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-6" aria-label="Filtros de resenas">
      <label class="text-sm font-bold text-slate-700">
        Persona
        <input
          id="filter-review-user"
          type="search"
          placeholder="Nombre"
          class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
        />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Sitio o evento
        <input
          id="filter-review-target"
          type="search"
          placeholder="Nombre"
          class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
        />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Tipo
        <select
          id="filter-review-type"
          class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
        >
          <option value="">Todas</option>
          <option value="place">Sitios</option>
          <option value="event">Eventos</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700">
        Estado
        <select
          id="filter-review-status"
          class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
        >
          <option value="">Todas</option>
          <option value="true">Visibles</option>
          <option value="false">Ocultas</option>
        </select>
      </label>

      <label class="text-sm font-bold text-slate-700">
        Fecha creacion
        <input
          id="filter-review-created"
          type="date"
          class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
        />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Fecha actualizacion
        <input
          id="filter-review-updated"
          type="date"
          class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
        />
      </label>
    </section>

    <section id="admin-all-reviews" class="min-h-0 flex-1 overflow-y-auto" aria-labelledby="admin-all-reviews-title">
      <h2 id="admin-all-reviews-title" class="sr-only">Todas las resenas</h2>
      <ul class="space-y-3">
        ${reviewItems}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardAllReviewsEvents() {
  const reviewsSection = document.getElementById("admin-all-reviews");
  const filterReviewUser = document.getElementById("filter-review-user");
  const filterReviewTarget = document.getElementById("filter-review-target");
  const filterReviewType = document.getElementById("filter-review-type");
  const filterReviewStatus = document.getElementById("filter-review-status");
  const filterReviewCreated = document.getElementById("filter-review-created");
  const filterReviewUpdated = document.getElementById("filter-review-updated");

  if (!reviewsSection) {
    return;
  }

  function filterReviews() {
    const userValue = filterReviewUser.value.trim().toLowerCase();
    const targetValue = filterReviewTarget.value.trim().toLowerCase();
    const typeValue = filterReviewType.value;
    const statusValue = filterReviewStatus.value;
    const createdValue = filterReviewCreated.value;
    const updatedValue = filterReviewUpdated.value;
    const reviewItems = reviewsSection.querySelectorAll("[data-review-item]");

    reviewItems.forEach((reviewItem) => {
      const reviewUser = reviewItem.dataset.reviewUser || "";
      const reviewTarget = reviewItem.dataset.reviewTarget || "";
      const reviewType = reviewItem.dataset.reviewTypeFilter || "";
      const reviewActive = reviewItem.dataset.reviewActive || "";
      const reviewCreated = reviewItem.dataset.reviewCreated || "";
      const reviewUpdated = reviewItem.dataset.reviewUpdated || "";

      const matchUser = !userValue || reviewUser.includes(userValue);
      const matchTarget = !targetValue || reviewTarget.includes(targetValue);
      const matchType = !typeValue || reviewType === typeValue;
      const matchStatus = !statusValue || reviewActive === statusValue;
      const matchCreated = !createdValue || reviewCreated === createdValue;
      const matchUpdated = !updatedValue || reviewUpdated === updatedValue;

      if (matchUser && matchTarget && matchType && matchStatus && matchCreated && matchUpdated) {
        reviewItem.classList.remove("hidden");
      } else {
        reviewItem.classList.add("hidden");
      }
    });
  }

  filterReviewUser.addEventListener("input", filterReviews);
  filterReviewTarget.addEventListener("input", filterReviews);
  filterReviewType.addEventListener("change", filterReviews);
  filterReviewStatus.addEventListener("change", filterReviews);
  filterReviewCreated.addEventListener("change", filterReviews);
  filterReviewUpdated.addEventListener("change", filterReviews);

  reviewsSection.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-hide-review='true']");

    if (button) {
      const reviewType = button.dataset.reviewType;
      const reviewId = button.dataset.reviewId;

      try {
        button.disabled = true;
        button.textContent = "Ocultando...";

        await hideAdminDashboardReview(reviewType, reviewId);

        const reviewItem = button.closest("[data-review-item]");
        if (reviewItem) {
          const reviewStatusLabel = reviewItem.querySelector("[data-review-status-label='true']");

          reviewItem.dataset.reviewActive = "false";
          button.outerHTML = `
            <button
              type="button"
              data-show-review="true"
              data-review-type="${reviewType}"
              data-review-id="${reviewId}"
              class="mt-2 cursor-pointer rounded-lg border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-600 transition hover:bg-emerald-50"
            >
              Mostrar
            </button>
          `;

          if (reviewStatusLabel) {
            reviewStatusLabel.textContent = "Oculta";
            reviewStatusLabel.className = "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500";
          }

          filterReviews();
        }
      } catch (error) {
        button.disabled = false;
        button.textContent = "Ocultar";
        alert("No se pudo ocultar la resena. Intenta de nuevo.");
      }
    }

    const showButton = event.target.closest("[data-show-review='true']");

    if (showButton) {
      const reviewType = showButton.dataset.reviewType;
      const reviewId = showButton.dataset.reviewId;

      try {
        showButton.disabled = true;
        showButton.textContent = "Mostrando...";

        await showAdminDashboardReview(reviewType, reviewId);

        const reviewItem = showButton.closest("[data-review-item]");
        if (reviewItem) {
          const reviewStatusLabel = reviewItem.querySelector("[data-review-status-label='true']");

          reviewItem.dataset.reviewActive = "true";
          showButton.outerHTML = `
            <button
              type="button"
              data-hide-review="true"
              data-review-type="${reviewType}"
              data-review-id="${reviewId}"
              class="mt-2 cursor-pointer rounded-lg border border-red-200 px-3 py-1 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              Ocultar
            </button>
          `;

          if (reviewStatusLabel) {
            reviewStatusLabel.textContent = "Visible";
            reviewStatusLabel.className = "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700";
          }

          filterReviews();
        }
      } catch (error) {
        showButton.disabled = false;
        showButton.textContent = "Mostrar";
        alert("No se pudo mostrar la resena. Intenta de nuevo.");
      }
    }
  });
}

export function renderAdminDashboardBackEvent() {
  const backButton = document.querySelector("[data-admin-dashboard-back='true']");

  if (!backButton) {
    return;
  }

  backButton.addEventListener("click", () => {
    window.location.reload();
  });
}
