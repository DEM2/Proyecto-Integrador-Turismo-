
function formatEventPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "0";
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return "Precio por confirmar";
  }

  return `Desde $${numericPrice.toLocaleString("es-CO")}`;
}

export function renderEventCard(event) {
  const name = event.name || "Evento sin nombre";
  const address = event.address || "Lugar por confirmar";
  const startDate = event.start_date || "Sin fecha";
  const endDate = event.end_date || "Sin fecha";
  const price = formatEventPrice(event.price);

  return `
    <article
      class="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <figure class="relative h-64 overflow-hidden">
        <img
          src="/src/assets/images/hero.png"
          alt="${name}"
          class="h-full w-full object-cover"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/10 to-transparent"></div>

        
      </figure>

      <section class="space-y-4 p-5">
        <header>
          <h3 class="text-xl font-black text-blue-950">
            ${name}
          </h3>
        </header>

        <div class="space-y-2 text-sm text-slate-600">
          <p><span class="font-semibold text-slate-700">Lugar:</span> ${address}</p>
          <p><span class="font-semibold text-slate-700">Fecha de inicio:</span> ${startDate}</p>
          <p><span class="font-semibold text-slate-700">Fecha de finalización:</span> ${endDate}</p>
        </div>

        <footer class="">
          <strong class=" text-md text-blue-700">
            ${price}
          </strong>
        </footer>
      </section>
    </article>
  `;
}