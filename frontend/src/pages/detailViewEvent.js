
export function renderViewDetailEvent(){

    return `
        <!-- VISTA DETALLE DE EVENTO -->
<main class="min-h-screen bg-slate-50 text-blue-950">

  <!-- HEADER PRINCIPAL -->
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-8 py-4 shadow-sm backdrop-blur-sm">

    <nav class="mx-auto flex max-w-7xl items-center justify-between">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3">
        <strong class="text-2xl font-bold text-blue-950">Barranquilla</strong>

        <img
          src="/images/Logo.png"
          alt="Barranquilla Explora"
          class="h-9 w-auto object-contain"
        />
      </a>

      <!-- Menú -->
      <ul class="hidden items-center gap-8 text-sm font-semibold md:flex">
        <li>
          <a href="/" class="hover:text-blue-600">Explorar</a>
        </li>

        <li>
          <a href="/experiencias" class="hover:text-blue-600">Experiencias</a>
        </li>

        <li>
          <a href="/destinos" class="hover:text-blue-600">Destinos</a>
        </li>

        <li>
          <a href="/eventos" class="text-blue-600">Eventos</a>
        </li>

        <li>
          <a href="/guia" class="hover:text-blue-600">Guía</a>
        </li>
      </ul>

      <!-- Acciones -->
      <ul class="flex items-center gap-3">
        <li>
          <button class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 shadow-sm hover:bg-blue-50">
            ♡
          </button>
        </li>

        <li>
          <button class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 shadow-sm hover:bg-blue-50">
            👤
          </button>
        </li>
      </ul>

    </nav>
  </header>

  <!-- CONTENIDO -->
  <section class="mx-auto max-w-7xl px-6 py-8">

    <!-- BREADCRUMB -->
    <nav class="mb-4 text-sm text-slate-500" aria-label="Ruta de navegación">
      <ol class="flex flex-wrap items-center gap-2">
        <li>
          <a href="/" class="hover:text-blue-600">Inicio</a>
        </li>

        <li>/</li>

        <li>
          <a href="/eventos" class="hover:text-blue-600">Eventos</a>
        </li>

        <li>/</li>

        <li class="font-semibold text-blue-950">
          Carnaval de Barranquilla 2027
        </li>
      </ol>
    </nav>

    <!-- HERO DEL EVENTO -->
    <header class="relative overflow-hidden rounded-[32px] bg-white shadow-xl">

      <figure class="relative h-[360px] w-full">

        <img
          src="/images/carnaval-detalle.jpg"
          alt="Carnaval de Barranquilla"
          class="h-full w-full object-cover"
        />

        <figcaption class="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-950/10 to-transparent"></figcaption>

        <!-- Fecha flotante -->
        <time
          datetime="2027-02-14"
          class="absolute bottom-10 left-8 rounded-2xl bg-white px-5 py-4 text-center font-black text-blue-950 shadow-xl"
        >
          <span class="block text-2xl">14 - 17</span>
          <span class="block text-sm text-slate-500">FEB</span>
          <span class="block text-sm text-slate-500">2027</span>
        </time>

        <!-- Botones flotantes -->
        <ul class="absolute right-6 top-6 flex gap-3">
          <li>
            <button class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-lg hover:bg-blue-50">
              ♡
            </button>
          </li>

          <li>
            <button class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-lg hover:bg-blue-50">
              ↗
            </button>
          </li>
        </ul>

      </figure>

      <!-- Tarjeta principal superpuesta -->
      <article class="-mt-20 ml-8 mr-8 mb-6 relative rounded-[24px] bg-white p-6 shadow-2xl">

        <h1 class="mb-3 text-4xl font-black text-blue-950">
          Carnaval de Barranquilla 2027
        </h1>

        <!-- Rating -->
        <p class="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span class="text-xl text-yellow-400">★★★★★</span>
          <strong>4.9</strong>
          <span class="text-slate-500">(2.356 reseñas)</span>
        </p>

        <!-- Datos rápidos -->
        <ul class="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">

          <li class="flex items-center gap-2">
            <span class="text-blue-600">📅</span>
            <span>14 - 17 Febrero 2027</span>
          </li>

          <li class="flex items-center gap-2">
            <span class="text-blue-600">📍</span>
            <span>Vía 40 y distintos escenarios</span>
          </li>

          <li class="flex items-center gap-2">
            <span class="text-blue-600">🕘</span>
            <span>Desde 8:00 AM</span>
          </li>

          <li class="flex items-center gap-2">
            <span class="text-blue-600">🎟️</span>
            <span>Evento gratuito</span>
          </li>

        </ul>
      </article>

    </header>

    <!-- TABS -->
    <nav class="mt-6 rounded-2xl bg-white p-2 shadow-sm">
      <ul class="grid grid-cols-2 gap-2 text-sm font-bold md:grid-cols-4">

        <li>
          <a href="#informacion" class="block rounded-xl bg-blue-600 px-4 py-3 text-center text-white">
            Información
          </a>
        </li>

        <li>
          <a href="#agenda" class="block rounded-xl px-4 py-3 text-center text-slate-600 hover:bg-blue-50 hover:text-blue-600">
            Agenda
          </a>
        </li>

        <li>
          <a href="#ubicacion" class="block rounded-xl px-4 py-3 text-center text-slate-600 hover:bg-blue-50 hover:text-blue-600">
            Ubicación
          </a>
        </li>

        <li>
          <a href="#comentarios" class="block rounded-xl px-4 py-3 text-center text-slate-600 hover:bg-blue-50 hover:text-blue-600">
            Comentarios
          </a>
        </li>

      </ul>
    </nav>

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
            El Carnaval de Barranquilla es la fiesta cultural más grande de Colombia
            y una de las más importantes del mundo. Disfruta de desfiles, música,
            danzas, disfraces y toda la alegría que caracteriza a nuestra gente.
          </p>

          <ul class="grid grid-cols-1 gap-3 text-sm text-slate-600 md:grid-cols-2">

            <li class="flex items-center gap-2">
              <span class="text-blue-600">🎭</span>
              Desfiles y comparsas
            </li>

            <li class="flex items-center gap-2">
              <span class="text-blue-600">🎵</span>
              Conciertos y shows en vivo
            </li>

            <li class="flex items-center gap-2">
              <span class="text-blue-600">👨‍👩‍👧</span>
              Eventos para toda la familia
            </li>

            <li class="flex items-center gap-2">
              <span class="text-blue-600">🍲</span>
              Gastronomía típica
            </li>

            <li class="flex items-center gap-2">
              <span class="text-blue-600">📸</span>
              Espacios ideales para fotos
            </li>

            <li class="flex items-center gap-2">
              <span class="text-blue-600">🚌</span>
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

          <section class="grid grid-cols-1 gap-4 md:grid-cols-4">

            <article class="rounded-2xl border border-slate-200 p-4">
              <h3 class="mb-1 text-lg font-black text-blue-950">14 FEB</h3>
              <p class="mb-4 text-sm text-slate-500">Sábado</p>

              <ul class="space-y-3 text-sm">
                <li>
                  <time class="block font-bold text-blue-950">8:00 AM</time>
                  <span class="text-slate-600">Batalla de Flores</span>
                </li>

                <li>
                  <time class="block font-bold text-blue-950">3:00 PM</time>
                  <span class="text-slate-600">Conciertos en la Vía 40</span>
                </li>
              </ul>
            </article>

            <article class="rounded-2xl border border-slate-200 p-4">
              <h3 class="mb-1 text-lg font-black text-blue-950">15 FEB</h3>
              <p class="mb-4 text-sm text-slate-500">Domingo</p>

              <ul class="space-y-3 text-sm">
                <li>
                  <time class="block font-bold text-blue-950">9:00 AM</time>
                  <span class="text-slate-600">Gran Parada de Tradición</span>
                </li>

                <li>
                  <time class="block font-bold text-blue-950">4:00 PM</time>
                  <span class="text-slate-600">Festival de Orquestas</span>
                </li>
              </ul>
            </article>

            <article class="rounded-2xl border border-slate-200 p-4">
              <h3 class="mb-1 text-lg font-black text-blue-950">16 FEB</h3>
              <p class="mb-4 text-sm text-slate-500">Lunes</p>

              <ul class="space-y-3 text-sm">
                <li>
                  <time class="block font-bold text-blue-950">9:00 AM</time>
                  <span class="text-slate-600">Gran Parada de Comparsas</span>
                </li>

                <li>
                  <time class="block font-bold text-blue-950">7:00 PM</time>
                  <span class="text-slate-600">Noche de Orquestas</span>
                </li>
              </ul>
            </article>

            <article class="rounded-2xl border border-slate-200 p-4">
              <h3 class="mb-1 text-lg font-black text-blue-950">17 FEB</h3>
              <p class="mb-4 text-sm text-slate-500">Martes</p>

              <ul class="space-y-3 text-sm">
                <li>
                  <time class="block font-bold text-blue-950">10:00 AM</time>
                  <span class="text-slate-600">Desfile de Joselito Carnaval</span>
                </li>

                <li>
                  <time class="block font-bold text-blue-950">6:00 PM</time>
                  <span class="text-slate-600">Concierto de cierre</span>
                </li>
              </ul>
            </article>

          </section>

        </article>

        <!-- UBICACIÓN -->
        <article id="ubicacion" class="rounded-[24px] bg-white p-7 shadow-sm">

          <h2 class="mb-4 text-2xl font-black text-blue-950">
            Ubicación
          </h2>

          <address class="mb-5 not-italic text-slate-600">
            Vía 40 y distintos escenarios de Barranquilla, Atlántico.
          </address>

          <figure class="h-64 overflow-hidden rounded-2xl border border-slate-200 bg-blue-50">
            <img
              src="/images/mapa-evento.jpg"
              alt="Mapa de ubicación del Carnaval de Barranquilla"
              class="h-full w-full object-cover"
            />
          </figure>

        </article>

        <!-- COMENTARIOS -->
        <article id="comentarios" class="rounded-[24px] bg-white p-7 shadow-sm">

          <header class="mb-5 flex items-center justify-between">
            <h2 class="text-2xl font-black text-blue-950">
              Comentarios
              <span class="text-base text-slate-400">(2.356)</span>
            </h2>

            <button class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
              Escribir comentario
            </button>
          </header>

          <section class="grid grid-cols-1 gap-4 md:grid-cols-2">

            <article class="rounded-2xl border border-slate-200 p-5">
              <header class="mb-3 flex items-center gap-3">
                <img
                  src="/images/user-1.jpg"
                  alt="Foto de María Torres"
                  class="h-11 w-11 rounded-full object-cover"
                />

                <p>
                  <strong class="block text-blue-950">María Torres</strong>
                  <span class="text-xs text-slate-500">Hace 3 horas</span>
                </p>
              </header>

              <p class="text-sm text-slate-600">
                ¿Habrá parqueaderos disponibles cerca de la Vía 40?
              </p>

              <footer class="mt-4 flex gap-4 text-xs font-semibold text-blue-600">
                <button>Me gusta</button>
                <button>Responder</button>
              </footer>
            </article>

            <article class="rounded-2xl border border-slate-200 p-5">
              <header class="mb-3 flex items-center gap-3">
                <img
                  src="/images/user-2.jpg"
                  alt="Foto de Organización Carnaval"
                  class="h-11 w-11 rounded-full object-cover"
                />

                <p>
                  <strong class="block text-blue-950">Organización Carnaval</strong>
                  <span class="text-xs text-slate-500">Hace 2 horas</span>
                </p>
              </header>

              <p class="text-sm text-slate-600">
                ¡Hola! Sí, tendremos varios parqueaderos habilitados. Te recomendamos llegar temprano.
              </p>

              <footer class="mt-4 flex gap-4 text-xs font-semibold text-blue-600">
                <button>Me gusta</button>
                <button>Responder</button>
              </footer>
            </article>

          </section>

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
              <span class="text-blue-600">📅</span>
              <p>
                <strong class="block text-blue-950">Fecha</strong>
                14 - 17 Febrero 2027
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span class="text-blue-600">🕘</span>
              <p>
                <strong class="block text-blue-950">Horario</strong>
                Desde 8:00 AM
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span class="text-blue-600">📍</span>
              <p>
                <strong class="block text-blue-950">Lugar</strong>
                Vía 40 y distintos escenarios Barranquilla, Atlántico
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span class="text-blue-600">🎟️</span>
              <p>
                <strong class="block text-blue-950">Entrada</strong>
                Evento gratuito
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span class="text-blue-600">💰</span>
              <p>
                <strong class="block text-blue-950">Precio</strong>
                Gratis
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
  </section>
</main>
    `
}

export function  eventViewDetailEvent() {
    return null
}