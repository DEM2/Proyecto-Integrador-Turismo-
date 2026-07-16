function renderStars(score) {
  const normalizedScore = Math.max(0, Math.min(5, Math.round(Number(score ?? 0))));
  return `${"&#9733;".repeat(normalizedScore)}${"&#9734;".repeat(5 - normalizedScore)}`;
}

function renderRecentReviewItem(review) {
  const rating = Number(review.score ?? 0).toFixed(1);
  const image = review.image_main || "/images/carnaval-detalle.png";

  return `
    <li class="grid grid-cols-[4.5rem_1fr_auto] gap-3 px-5 py-2.5">
      <img src="${image}" alt="" class="h-14 w-18 rounded-lg object-cover" />
      <article>
        <h3 class="font-extrabold text-slate-800 lg:text-sm">${review.target_name}</h3>
        <p class="text-sm font-semibold text-slate-500">por ${review.author}</p>
        <p class="mt-1 text-sm font-bold text-amber-400" aria-label="Calificacion ${rating} de 5">${renderStars(review.score)} <span class="ml-2 text-slate-500">${rating}</span></p>
      </article>
      <p class="text-right text-sm font-medium text-slate-500">${review.review_date}</p>
    </li>
  `;
}

export function renderAdminDashboardRecentReviews(recentReviews = []) {
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
