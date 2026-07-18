import { getEventDetail } from "../../services/eventService.js";
import {
    renderMainNavigation,
    initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { RenderCommentary } from "../../components/cards/commentary.card.js";
import { RenderCommentariesModal } from "../../components/layout/commentaryModal.js";
import { SaveCommentaries } from "../../components/layout/commentaryModal.js";
import { getReviews } from "../../services/EventReview.service.js";
import { renderIconSvg } from "../../utils/renderIcon.js";
import {
    CalendarDays,
    MapPin,
    Clock,
    Ticket,
    Drama,
    Music,
    Users,
    UtensilsCrossed,
    Camera,
    Navigation,
    Heart,
    Share2,
} from "lucide";

let currentEvent = null;

function numericDayDate(eventDate) {
    const currentDate = new Date(eventDate);

    const resultDate = currentDate.toLocaleDateString("es-CO", {
        day: "numeric",
        timeZone: "America/Bogota",
    });

    return resultDate;
}
function textMonthDate(eventDate) {
    const currentDate = new Date(eventDate);

    const resultDate = currentDate.toLocaleDateString("es-CO", {
        month: "long",
        timeZone: "America/Bogota",
    });

    return resultDate;
}
function numericYearDate(eventDate) {
    const currentDate = new Date(eventDate);

    const resultDate = currentDate.toLocaleDateString("es-CO", {
        year: "numeric",
        timeZone: "America/Bogota",
    });

    return resultDate;
}
function textDayDate(eventDate) {
    const currentDate = new Date(eventDate);

    const resultDate = currentDate.toLocaleDateString("es-CO", {
        weekday: "long",
        timeZone: "America/Bogota",
    });

    return resultDate;
}
function formatAgendaTime(eventTime) {
    const [hours, minutes] = eventTime.split(":");

    const currentDate = new Date();
    currentDate.setHours(Number(hours), Number(minutes), 0, 0);

    const resultDate = currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return resultDate;
}

export async function renderEventDetailPage() {
    try {
        const id = Number(localStorage.getItem("selectedEventId")) || 1;

        currentEvent = await getEventDetail(id);

        const eventDetail = currentEvent;

        const startDate = numericDayDate(eventDetail.start_date);
        const endDate = numericDayDate(eventDetail.end_date);
        const textMonth = textMonthDate(eventDetail.start_date);
        const yearDate = numericYearDate(eventDetail.start_date);

        return `
        <!-- VISTA DETALLE DE EVENTO -->
<main class="event-detail-page min-h-screen bg-slate-50 text-blue-950">
  ${renderMainNavigation()}

  <!-- CONTENIDO -->
  <section class="mx-auto max-w-7xl px-6 py-8 max-md:px-[14px] max-md:py-4 max-md:pb-6">

    <!-- HERO DEL EVENTO -->
    <header class="relative overflow-hidden rounded-[32px] bg-white shadow-xl">

      <figure class="relative h-[360px] w-full max-md:h-[255px]">

        <img
          src="${eventDetail.image_main}"
          alt="${eventDetail.name}"
          class="h-full w-full object-cover"
        />

        <figcaption class="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-950/10 to-transparent"></figcaption>

        <!-- Fecha flotante -->
        <time
          datetime="2027-02-14"
          class="absolute bottom-10 left-8 z-40 rounded-2xl bg-white px-5 py-4 text-center font-black text-blue-950 shadow-xl max-md:bottom-4 max-md:left-4 max-md:px-4 max-md:py-3"
        >
          <span class="block text-2xl">${startDate} - ${endDate}</span>
          <span class="block text-sm text-slate-500">${textMonth}</span>
          <span class="block text-sm text-slate-500">${yearDate}</span>
        </time>

        <!-- Botones flotantes -->
        
      </figure>

      <!-- Tarjeta principal (no superpuesta) -->
      <article class="relative z-20 mt-6 mb-6 ml-8 mr-8 rounded-[24px] bg-white p-6 shadow-2xl max-md:mx-[14px] max-md:p-5">

        <h1 class="mb-3 text-4xl font-black text-blue-950 max-md:text-[1.875rem]">
          ${eventDetail.name}
        </h1>

        <!-- Rating -->
        <p class="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span class="text-xl text-yellow-400">★★★★★</span>
          <strong>4.9</strong>
          <span id="reviews-count" class="text-base text-slate-400">
          (0)
          </span>
        </p>

        <!-- Datos rápidos -->
        <ul class="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">

          <li class="flex items-center gap-2">
            ${renderIconSvg(CalendarDays, { class: "size-5 text-blue-600", strokeWidth: 2 })}
            <span>${startDate} - ${endDate} ${textMonth} ${yearDate}</span>
          </li>

          <li class="flex items-center gap-2">
            ${renderIconSvg(MapPin, { class: "size-5 text-blue-600", strokeWidth: 2 })}
            <span>${eventDetail.address}</span>
          </li>

          <li class="flex items-center gap-2">
            ${renderIconSvg(Clock, { class: "size-5 text-blue-600", strokeWidth: 2 })}
            <span>Desde ${eventDetail.start_time} AM</span>
          </li>

          <li class="flex items-center gap-2">
            ${renderIconSvg(Ticket, { class: "size-5 text-blue-600", strokeWidth: 2 })}
            <span>${
                Number(eventDetail.price) === 0
                    ? "Evento gratuito"
                    : `Precio: $${Number(eventDetail.price).toLocaleString("es-CO")}`
            }</span>
          </li>

        </ul>
      </article>

    </header>

    <!-- CUERPO PRINCIPAL -->
    <section class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">

      <!-- COLUMNA IZQUIERDA -->
      <section class="space-y-8">

        <!-- SOBRE EL EVENTO -->
        <article id="informacion" class="rounded-[24px] bg-white p-7 shadow-sm">

          <h2 class="mb-4 text-2xl font-black text-blue-950">
            Sobre el evento
          </h2>

          <p class="mb-5 leading-relaxed text-slate-600">
            ${eventDetail.description}
          </p>

          <ul class="grid grid-cols-1 gap-3 text-sm text-slate-600 md:grid-cols-2">

            <li class="flex items-center gap-2">
              ${renderIconSvg(Drama, { class: "size-5 text-blue-600", strokeWidth: 2 })}
              Desfiles y comparsas
            </li>

            <li class="flex items-center gap-2">
              ${renderIconSvg(Music, { class: "size-5 text-blue-600", strokeWidth: 2 })}
              Conciertos y shows en vivo
            </li>

            <li class="flex items-center gap-2">
              ${renderIconSvg(Users, { class: "size-5 text-blue-600", strokeWidth: 2 })}
              Eventos para toda la familia
            </li>

            <li class="flex items-center gap-2">
              ${renderIconSvg(UtensilsCrossed, { class: "size-5 text-blue-600", strokeWidth: 2 })}
              Gastronomía típica
            </li>

            <li class="flex items-center gap-2">
              ${renderIconSvg(Camera, { class: "size-5 text-blue-600", strokeWidth: 2 })}
              Espacios ideales para fotos
            </li>

            <li class="flex items-center gap-2">
              ${renderIconSvg(Navigation, { class: "size-5 text-blue-600", strokeWidth: 2 })}
              Rutas de acceso recomendadas
            </li>

          </ul>

          <footer class="mt-6">
            <button class="rounded-xl border border-blue-600 px-5 py-3 text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white">
              Compartir evento
            </button>
          </footer>

        </article>

        <!-- AGENDA -->
        <article id="agenda" class="rounded-[24px] bg-white p-7 shadow-sm">

          <header class="mb-5 flex items-center justify-between">
            <h2 class="text-2xl font-black text-blue-950">
              Agenda del evento
            </h2>

            <a href="#" class="text-sm font-bold text-blue-600 hover:underline">
              Ver agenda completa
            </a>
          </header>

          <section id="event-agenda" class="grid grid-cols-1 gap-4 md:grid-cols-4">

          </section>

        </article>

        <!-- UBICACIÓN -->
        <article id="ubicacion" class="rounded-[24px] bg-white p-7 shadow-sm">

          <h2 class="mb-4 text-2xl font-black text-blue-950">
            Ubicación
          </h2>

          <address class="mb-5 not-italic text-slate-600">
          ${eventDetail.address}
          </address>

          <figure class="h-64 overflow-hidden rounded-2xl border border-slate-200 bg-blue-50">
            <img
              src="/src/assets/images/hero.png"
              alt="Mapa de ubicación del ${eventDetail.name}"
              class="h-full w-full object-cover"
            />
          </figure>

        </article>

      </section>

      <!-- COLUMNA DERECHA -->
      <aside class="space-y-6">

        <!-- INFORMACIÓN DEL EVENTO -->
        <article class="sticky top-28 rounded-[24px] bg-white p-6 shadow-xl">

          <h2 class="mb-5 text-xl font-black text-blue-950">
            Información del evento
          </h2>

          <ul class="space-y-4 text-sm text-slate-600">

            <li class="flex items-start gap-3">
              ${renderIconSvg(CalendarDays, { class: "size-5 text-blue-600 flex-shrink-0 mt-1", strokeWidth: 2 })}
              <p>
                <strong class="block text-blue-950">Fecha</strong>
                ${startDate} - ${endDate} ${textMonth} ${yearDate}
              </p>
            </li>

            <li class="flex items-start gap-3">
              ${renderIconSvg(Clock, { class: "size-5 text-blue-600 flex-shrink-0 mt-1", strokeWidth: 2 })}
              <p>
                <strong class="block text-blue-950">Horario</strong>
                Desde ${formatAgendaTime(eventDetail.start_time)} AM
              </p>
            </li>

            <li class="flex items-start gap-3">
              ${renderIconSvg(MapPin, { class: "size-5 text-blue-600 flex-shrink-0 mt-1", strokeWidth: 2 })}
              <p>
                  <strong class="block text-blue-950">Lugar</strong>
                  ${eventDetail.address}
              </p>
            </li>

            <li class="flex items-start gap-3">
              ${renderIconSvg(Ticket, { class: "size-5 text-blue-600 flex-shrink-0 mt-1", strokeWidth: 2 })}
              <p>
                <strong class="block text-blue-950">Entrada</strong>
                ${
                    Number(eventDetail.price) === 0
                        ? "Evento gratiuto"
                        : `Evento pago`
                }
              </p>
            </li>

            <li class="flex items-start gap-3">
              ${renderIconSvg(Ticket, { class: "size-5 text-green-600 flex-shrink-0 mt-1", strokeWidth: 2 })}
              <p>
                <strong class="block text-blue-950">Precio</strong>
                ${
                    Number(eventDetail.price) === 0
                        ? "Gratis"
                        : `$ ${Number(eventDetail.price).toLocaleString("es-CO")}`
                }
              </p>
            </li>

          </ul>

          <footer class="mt-6 space-y-3">
            <button class="h-12 w-full rounded-xl bg-blue-950 font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-900">
              Agregar a mi calendario
            </button>

            <button class="h-12 w-full rounded-xl border border-blue-600 font-bold text-blue-600 hover:bg-blue-50">
              Ver ubicación
            </button>
          </footer>
        </article>
      </aside>
    </section>

    <!-- COMENTARIOS: AL FINAL EN RESPONSIVE -->
    <article id="comentarios" class="rounded-[24px] bg-white p-7 shadow-sm">

      <header class="mb-5 flex items-center justify-between">
        <h2 class="text-2xl font-black text-blue-950">
          Comentarios
            <span id="rating-count" class="text-slate-500">
            (0 reseñas)
            </span>
         
        </h2>

        <button id = "read_comentaries" class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
          Escribir comentario
        </button>
      </header>

      <section
      id="commentaries-container"
      class="grid grid-cols-1 gap-4 md:grid-cols-2">

      </section>

    </article>

  </section>
</main>
 `;
    } catch (error) {
        currentEvent = null;

        return;
    }
}

export async function initializeEventDetailPageEvents() {

    if (!currentEvent) return;

    renderEventAgenda(currentEvent.agenda);

    await loadCommentaries();

    create_commentaries();

}

function groupAgenda(eventAgenda) {
    const groupAgenda = {};

    for (const activity of eventAgenda) {
        //Guardamos los primeros 10 valores de la fecha del subevento
        const date = activity.activity_date.slice(0, 10);

        if (!groupAgenda[date]) {
            groupAgenda[date] = [];
        }
        groupAgenda[date].push(activity);
    }

    return groupAgenda;
}

function renderDayAgenda(dayActivities) {
    let html = "";

    for (const activity of dayActivities) {
        html += `
          <li>
                  <time class="block font-bold text-blue-950">${formatAgendaTime(activity.activity_time)}</time>
                  <span class="text-slate-600">${activity.title}</span>
                </li>
    `;
    }

    return html;
}

function renderEventAgenda(eventAgenda) {
    initializeMainNavigationEvents();
    const agendaContainer = document.getElementById("event-agenda");

    if (!agendaContainer) {
        return;
    }

    if (!eventAgenda || eventAgenda.length === 0) {
        agendaContainer.innerHTML = `
      <p class="text-slate-500">
        Evento general.
      </p>
    `;
        return;
    }

    const groupedAgenda = groupAgenda(eventAgenda);

    let html = "";

    for (const key in groupedAgenda) {
        const dayActivities = groupedAgenda[key];

        html += `
      <article class="rounded-2xl border border-slate-200 p-4">
              <h3 class="mb-1 text-lg font-black text-blue-950">${numericDayDate(key)} ${textMonthDate(key).toUpperCase()}</h3>
              <p class="mb-4 text-sm text-slate-500">${textDayDate(key)}</p>

              <ul class="space-y-3 text-sm">
                ${renderDayAgenda(dayActivities)}
              </ul>
            </article>
    `;
    }

    agendaContainer.innerHTML = html;
}
function create_commentaries() {

    const bottonCommentary = document.getElementById("read_comentaries");

    bottonCommentary.addEventListener("click", () => {

        document.body.insertAdjacentHTML(
            "beforeend",
            RenderCommentariesModal()
        );

        SaveCommentaries(currentEvent.id, loadCommentaries);

    });

}
async function loadCommentaries() {

    const commentaries = await getReviews(currentEvent.id);

    const totalReviews = commentaries.length;

    document.getElementById("reviews-count").textContent =
        `(${totalReviews})`;

    document.getElementById("rating-count").textContent =
        `(${totalReviews} reseñas)`;

    const container = document.getElementById("commentaries-container");

    container.innerHTML = commentaries
        .map(commentary => RenderCommentary(commentary))
        .join("");
}
