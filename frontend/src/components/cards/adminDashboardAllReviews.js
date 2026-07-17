import {
  getAdminDashboardAllReviews,
  hideAdminDashboardReview,
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
          Todas las resenas activas de sitios y eventos
        </p>
      </div>

      <button
        type="button"
        data-admin-dashboard-back="true"
        class="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
      >
        Volver al dashboard
      </button>
    </header>

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

  if (!reviewsSection) {
    return;
  }

  reviewsSection.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-hide-review='true']");

    if (!button) {
      return;
    }

    const reviewType = button.dataset.reviewType;
    const reviewId = button.dataset.reviewId;

    try {
      button.disabled = true;
      button.textContent = "Ocultando...";

      await hideAdminDashboardReview(reviewType, reviewId);

      const reviewItem = button.closest("[data-review-item]");
      if (reviewItem) {
        reviewItem.remove();
      }
    } catch (error) {
      console.error(error);
      button.disabled = false;
      button.textContent = "Ocultar";
      alert("No se pudo ocultar la resena. Intenta de nuevo.");
    }
  });
}
