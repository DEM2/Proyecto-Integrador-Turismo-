export function renderReviewCardOrganizador(review) {
  
  const {
    name,
    score,
    created_at,
    comments,
  } = review;


  const stars = Array.from({ length: 5 }, (_, index) => `
    <img
      src="/images/icons/star.svg"
      alt="Estrella"
      class="size-5 ${index < score ? "opacity-100" : "opacity-25"}"
    />
  `).join("");

  return `
    <!-- RESEÑA 1 -->
        <article class="flex gap-5 border-b border-slate-200 py-7">

          <figure class="shrink-0">
            <img
              src="/images/familias.webp"
              alt="Foto de Laura Gómez"
              class="size-16 rounded-full object-cover"
            />
          </figure>




          <section class="flex-1">

            <header class="flex flex-wrap items-center gap-3">
              <h3 class="text-xl font-black text-blue-950">
                ${name}
              </h3>

              <p class="text-yellow-400 flex" aria-label="Calificación: ${score} estrellas">
                ${stars}
              </p>

              <time
                datetime="2025-04-20"
                class="text-sm text-slate-500"
              >
                ${created_at}
              </time>
            </header>

            <p class="mt-2 leading-relaxed text-slate-600">
              ${comments}
            </p>
          </section>

        </article>
  `;
}