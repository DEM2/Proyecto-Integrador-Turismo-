import { getSession } from "../../services/authService";

export function renderReviewCard(review) {
  const {
    image,
    target_name,
    score,
    created_at,
    userName,
    userPhoto,
    comments,
  } = review;

    const session = getSession();
    const user = session?.user;
    const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  const stars = Array.from({ length: 5 }, (_, index) => `
    <img
      src="/images/icons/star.svg"
      alt="Estrella"
      class="size-5 ${index < score ? "opacity-100" : "opacity-25"}"
    />
  `).join("");

  return `
    <article
      class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition hover:shadow-lg sm:flex-row sm:gap-5"
    >

      <!-- Imagen del lugar -->
      <figure class="h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-52">
        <img
          src="${image}"
          alt="${target_name}"
          class="h-full w-full object-cover"
        />
      </figure>

      <!-- Contenido -->
      <section class="flex min-w-0 flex-1 flex-col">

        <!-- Calificación -->
        <header class="flex flex-wrap items-center gap-2 sm:gap-3">

          <div class="flex">
            ${stars}
          </div>

          <span class="text-lg font-bold text-blue-950">
            ${score}
          </span>

          <span class="w-full text-sm text-slate-500 sm:w-auto">
            • ${created_at}
          </span>

        </header>

        <!-- Usuario -->
        <section class="mt-3 flex min-w-0 items-center gap-3">

          ${ userPhoto
            ? `
              <img
                src="${userPhoto}"
                alt="${userName}"
                class="size-11 rounded-full object-cover"
              />
            `
            : `
              <div
                class="size-11 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-lg select-none"
              >
                ${initial}
              </div>
            `
        }
          <div class="min-w-0">
            <h3 class="font-bold text-blue-950">
              ${user.name}
            </h3>

            <p class="text-sm font-medium text-slate-500 break-words">
              ${target_name}
            </p>
          </div>

        </section>

        <!-- Comentario -->
        <p class="mt-3 text-[15px] leading-7 text-slate-700">
          ${comments}
        </p>

      </section>

    </article>
  `;
}
