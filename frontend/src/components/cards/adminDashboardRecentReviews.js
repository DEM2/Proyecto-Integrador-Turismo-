import {
  getAdminDashboardData,
} from "../../services/adminDashboard.service.js";

function renderRecentReviewItem(review) {
  const userName = review.name || "Usuario";
  const comments = review.comments || "Sin comentario";
  const createdAt = review.created_at || "Sin fecha";
  const updatedAt = review.updated_at || "";

  return `
    <li class="grid grid-cols-[1fr_auto] gap-4 px-5 py-3">
      <article>
        <h3 class="font-extrabold text-slate-800 lg:text-sm">${userName}</h3>
        <p class="mt-1 line-clamp-2 text-sm font-medium text-slate-600">
          ${comments}
        </p>
        <p class="mt-1 text-xs font-semibold text-slate-400">
          ${updatedAt ? `Actualizada el ${updatedAt}` : ""}
        </p>
      </article>
      <p class="text-right text-sm font-medium text-slate-500">${createdAt}</p>
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
    <section aria-labelledby="recent-reviews-title" class="rounded-xl border border-slate-200 bg-white shadow-sm">
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
