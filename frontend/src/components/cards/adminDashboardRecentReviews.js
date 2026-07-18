import {
  getAdminDashboardData,
  hideAdminDashboardReview,
} from "../../services/adminDashboard.service.js";
import { renderAdminDashboardReviewItem } from "./adminDashboardReviewItem.js";
import {
  renderAdminDashboardAllReviews,
  renderAdminDashboardAllReviewsEvents,
  renderAdminDashboardBackEvent,
} from "./adminDashboardAllReviews.js";
import { alertaError } from "../../utils/alerts.js";

export async function renderAdminDashboardRecentReviews() {
  let recentReviews = [];

  try {
    const dashboardData = await getAdminDashboardData();
    recentReviews = dashboardData.recentReviews ?? recentReviews;
  } catch (error) {
    console.error(error);
  }

  let reviewItems = "";

  if (recentReviews.length > 0) {
    reviewItems = recentReviews.map((review) => renderAdminDashboardReviewItem(review)).join("");
  } else {
    reviewItems = `
      <li class="p-6 text-center text-sm font-semibold text-slate-500">
        No hay resenas recientes.
      </li>
    `;
  }

  return `
    <section id="admin-recent-reviews" aria-labelledby="recent-reviews-title" class="min-h-0 overflow-hidden overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <header class="flex items-center justify-between px-5 py-3">
        <h2 id="recent-reviews-title" class="text-xl font-extrabold lg:text-base">Resenas recientes</h2>
        <button type="button" data-show-all-reviews="true" class="cursor-pointer text-sm font-bold text-blue-600 transition hover:text-blue-700 hover:underline">Ver todas</button>
      </header>

      <ul class="divide-y divide-slate-200 border-t border-slate-200">
        ${reviewItems}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardRecentReviewsEvents() {
  const reviewsSection = document.getElementById("admin-recent-reviews");

  if (!reviewsSection) {
    return;
  }

  reviewsSection.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-hide-review='true']");

    const showAllReviewsButton = event.target.closest("[data-show-all-reviews='true']");

    if (showAllReviewsButton) {
      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllReviews();
      renderAdminDashboardAllReviewsEvents();
      renderAdminDashboardBackEvent();
      return;
    }

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
      alertaError("No se pudo ocultar la resena. Intenta de nuevo.");
    }
  });
}
