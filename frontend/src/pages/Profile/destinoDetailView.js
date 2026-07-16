export const destinoDetailView = () => `
<main class="bg-slate-50 min-h-screen">

  <!-- HERO -->
  <section class="relative h-[60vh]">
    <figure class="h-full">
      <img 
        src="/images/museo-carnaval.jpg" 
        alt="Museo del Carnaval de Barranquilla" 
        class="w-full h-full object-cover"
      />
    </figure>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Contenido sobre imagen -->
    <header class="absolute bottom-0 left-0 p-8 text-white">
      <h1 class="text-4xl font-bold">Museo del Carnaval</h1>

      <!-- Rating -->
      <p class="mt-2 flex items-center gap-2 text-yellow-400">
        ★★★★☆ <span class="text-white text-sm">(4.5 - 230 reseñas)</span>
      </p>
    </header>
  </section>

  <!-- CONTENIDO PRINCIPAL -->
  <section class="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

    <!-- COLUMNA IZQUIERDA -->
    <section class="lg:col-span-2 space-y-8">

      <!-- DESCRIPCIÓN -->
      <article class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <header>
          <h2 class="text-xl font-semibold text-blue-950">Descripción</h2>
        </header>
        <p class="mt-3 text-slate-600 leading-relaxed">
          El Museo del Carnaval es un espacio cultural que celebra la historia,
          tradición y alegría del Carnaval de Barranquilla. Aquí podrás conocer
          trajes, danzas, música y toda la esencia de esta festividad declarada
          Patrimonio de la Humanidad.
        </p>
      </article>

      <!-- GALERÍA -->
      <section>
        <header>
          <h2 class="text-xl font-semibold text-blue-950 mb-4">Galería</h2>
        </header>

        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <li>
            <figure>
              <img src="/images/museo-carnaval.jpg" alt="Interior museo" class="rounded-2xl object-cover h-40 w-full">
            </figure>
          </li>
          <li>
            <figure>
              <img src="/images/carnaval-detalle.jpg" alt="Trajes de carnaval" class="rounded-2xl object-cover h-40 w-full">
            </figure>
          </li>
          <li>
            <figure>
              <img src="/images/museo-carnaval.jpg" alt="Exposición cultural" class="rounded-2xl object-cover h-40 w-full">
            </figure>
          </li>
        </ul>
      </section>

      <!-- RESEÑAS -->
      <section>
        <header>
          <h2 class="text-xl font-semibold text-blue-950 mb-4">Reseñas</h2>
        </header>

        <ul class="space-y-4">
          
          <!-- Comentario -->
          <li class="bg-white p-4 rounded-2xl border border-slate-200">
            <article class="flex gap-4">
              <figure>
                <img src="/images/user-1.jpg" alt="Usuario" class="w-12 h-12 rounded-full object-cover">
              </figure>
              <section>
                <header class="flex items-center justify-between">
                  <h3 class="font-semibold text-blue-950">Carlos Pérez</h3>
                  <span class="text-yellow-400">★★★★★</span>
                </header>
                <p class="text-sm text-slate-600 mt-1">
                  Increíble experiencia, muy recomendado para entender la cultura del carnaval.
                </p>
              </section>
            </article>
          </li>

          <!-- Comentario -->
          <li class="bg-white p-4 rounded-2xl border border-slate-200">
            <article class="flex gap-4">
              <figure>
                <img src="/images/user-2.jpg" alt="Usuario" class="w-12 h-12 rounded-full object-cover">
              </figure>
              <section>
                <header class="flex items-center justify-between">
                  <h3 class="font-semibold text-blue-950">Laura Gómez</h3>
                  <span class="text-yellow-400">★★★★☆</span>
                </header>
                <p class="text-sm text-slate-600 mt-1">
                  Muy bonito, aunque podría tener más actividades interactivas.
                </p>
              </section>
            </article>
          </li>

        </ul>
      </section>

    </section>

    <!-- COLUMNA DERECHA -->
    <aside class="space-y-6">

      <!-- INFO PRÁCTICA -->
      <section class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <header>
          <h2 class="text-lg font-semibold text-blue-950">Información</h2>
        </header>

        <ul class="mt-4 space-y-3 text-sm text-slate-600">
          <li><strong>Categoría:</strong> Cultura</li>
          <li><strong>Horario:</strong> 9:00 AM - 5:00 PM</li>
          <li><strong>Precio:</strong> $10.000 COP</li>
        </ul>
      </section>

      <!-- UBICACIÓN -->
      <section class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <header>
          <h2 class="text-lg font-semibold text-blue-950">Ubicación</h2>
        </header>

        <figure class="mt-4">
          <img src="/images/mapa-evento.jpg" alt="Mapa ubicación museo" class="rounded-2xl">
        </figure>

        <address class="mt-3 text-sm text-slate-600 not-italic">
          Vía 40 #36-135, Barranquilla
        </address>

        <button class="mt-4 w-full bg-blue-950 text-white py-2 rounded-xl hover:bg-blue-900">
          Cómo llegar
        </button>
      </section>

      <!-- ACCIONES -->
      <section class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-3">
        
        <button class="w-full bg-blue-950 text-white py-3 rounded-xl hover:bg-blue-900">
          Guardar en favoritos
        </button>

        <button class="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50">
          + Agregar a itinerario
        </button>

      </section>

    </aside>

  </section>

</main>
`;