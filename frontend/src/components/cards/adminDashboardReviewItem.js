export function renderAdminDashboardReviewItem(review, showReviewType = false) {
  const reviewId = review.id_review || "";
  const reviewType = review.review_type || "";
  const userName = review.user_name || review.name || "Usuario";
  const reviewedItemName = review.reviewed_item_name || "Sin nombre";
  const comments = review.comments || "Sin comentario";
  const createdAt = review.created_at || "Sin fecha";
  const updatedAt = review.updated_at || "";
  const isActive = review.is_active !== false;

  let reviewTypeLabel = "";
  let reviewStatusLabel = "";
  let reviewBadges = "";
  let hideButton = "";

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

  if (showReviewType && isActive) {
    reviewStatusLabel = `
      <span data-review-status-label="true" class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
        Visible
      </span>
    `;
  }

  if (showReviewType && !isActive) {
    reviewStatusLabel = `
      <span data-review-status-label="true" class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
        Oculta
      </span>
    `;
  }

  if (isActive) {
    hideButton = `
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
  }

  if (!isActive) {
    hideButton = `
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
  }

  if (showReviewType) {
    reviewBadges = `
      <div class="flex flex-wrap gap-2">
        ${reviewTypeLabel}
        ${reviewStatusLabel}
      </div>
    `;
  }

  return `
    <li
      class="grid grid-cols-[1fr_auto] gap-4 px-5 py-3"
      data-review-item="${reviewType}-${reviewId}"
      data-review-user="${userName.toLowerCase()}"
      data-review-target="${reviewedItemName.toLowerCase()}"
      data-review-type-filter="${reviewType}"
      data-review-active="${isActive}"
      data-review-created="${createdAt}"
      data-review-updated="${updatedAt}"
    >
      <article>
        ${reviewBadges}
        <h3 class="font-extrabold text-slate-800 lg:text-sm ${showReviewType ? "mt-3" : ""}">
          ${userName}
        </h3>
        <p class="mt-1 text-xs font-bold text-blue-600">
          ${reviewType === "event" ? "Evento" : "Sitio"}: ${reviewedItemName}
        </p>
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
