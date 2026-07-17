import {
  getAdminDashboardData,
  hideAdminDashboardReview,
} from "../../services/adminDashboard.service.js";

function renderRecentReviewItem(review) {
  const reviewId = review;
  const reviewType = review.review_type || review.type || review.type_review || "";
  const userName = review.name || "Usuario";
  const comments = review.comments || "Sin comentario";
  const createdAt = review.created_at || "Sin fecha";
  const updatedAt = review.updated_at || "";
  console.log(reviewId);
  const hideButton = reviewId && reviewType
  
  
    ? `
        <button
          type="button"
          data-hide-review="true"
          data-review-type="${reviewType}"
          data-review-id="${reviewId}"
          class="mt-2 cursor-pointer rounded-lg border border-red-200 px-3 py-1 text-xs font-bold text-red-600 transition hover:bg-red-50"
        >
          Ocultar
        </button>
      `
    : "";

  return `
    <li class="grid grid-cols-[1fr_auto] gap-4 px-5 py-3" data-review-item="${reviewType}-${reviewId}">
      <article>
        <h3 class="font-extrabold text-slate-800 lg:text-sm"> ${userName}</h3>
        <p class="mt-1 line-clamp-2 text-sm font-medium text-slate-600">
          ${comments}
        </p>
        <p class="mt-1 text-xs font-semibold text-slate-400">
          ${updatedAt ? `Actualizada el ${updatedAt}` : ""}
        </p>
      </article>
      <div class="text-right">
        <p class="text-sm font-medium text-slate-500">Creado: ${createdAt}</p>
        ${hideButton}
      </div>
    </li>
  `;
}

export async function renderAdminDashboardRecentReviews() {
  let recentReviews = [];

  try {
    const dashboardData = await getAdminDashboardData();
    recentReviews = dashboardData.recentReviews ?? recentReviews;
  } catch (error) {
    console.error(error);
  }

  const reviewItems = recentReviews.length
    ? recentReviews.map((review) => renderRecentReviewItem(review)).join("")
    : `<li class="p-6 text-center text-sm font-semibold text-slate-500">No hay resenas recientes.</li>`;

  return `
    <section id="admin-recent-reviews" aria-labelledby="recent-reviews-title" class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden overflow-y-auto">
      <header class="flex items-center justify-between px-5 py-3">
        <h2 id="recent-reviews-title" class="text-xl font-extrabold lg:text-base">Resenas recientes</h2>
        <a href="#" class="cursor-pointer text-sm font-bold text-blue-600 transition hover:text-blue-700 hover:underline">Ver todas</a>
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
