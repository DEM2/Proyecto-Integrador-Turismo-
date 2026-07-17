export function renderAdminDashboardReviewItem(review, showReviewType = false) {
  const reviewId = review.id_review || "";
  const reviewType = review.review_type || "";
  const userName = review.name || "Usuario";
  const comments = review.comments || "Sin comentario";
  const createdAt = review.created_at || "Sin fecha";
  const updatedAt = review.updated_at || "";

  let reviewTypeLabel = "";

  if (showReviewType && reviewType === "event") {
    reviewTypeLabel = `
      <span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
        Evento
      </span>
    `;
  }

  if (showReviewType && reviewType === "place") {
    reviewTypeLabel = `
      <span class="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
        Sitio
      </span>
    `;
  }

  return `
    <li class="grid grid-cols-[1fr_auto] gap-4 px-5 py-3" data-review-item="${reviewType}-${reviewId}">
      <article>
        ${reviewTypeLabel}
        <h3 class="font-extrabold text-slate-800 lg:text-sm ${showReviewType ? "mt-3" : ""}">
          ${userName}
        </h3>
        <p class="mt-1 line-clamp-2 text-sm font-medium text-slate-600">
          ${comments}
        </p>
        <p class="mt-1 text-xs font-semibold text-slate-400">
          ${updatedAt ? `Actualizada el ${updatedAt}` : ""}
        </p>
      </article>
      <div class="text-right">
        <p class="text-sm font-medium text-slate-500">Creado: ${createdAt}</p>
        <button
          type="button"
          data-hide-review="true"
          data-review-type="${reviewType}"
          data-review-id="${reviewId}"
          class="mt-2 cursor-pointer rounded-lg border border-red-200 px-3 py-1 text-xs font-bold text-red-600 transition hover:bg-red-50"
        >
          Ocultar
        </button>
      </div>
    </li>
  `;
}
