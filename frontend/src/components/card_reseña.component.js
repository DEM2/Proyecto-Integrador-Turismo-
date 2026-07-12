
export function cardReseña(){
    return `
    <article
  class="flex bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 ease-out cursor-pointer"
>
  <!-- Imagen a la izquierda -->
  <div class="w-1/3">
    <img
      src="/src/assets/img/hero.png"
      alt="Malecón del Río"
      class="w-full h-full object-cover"
    />
  </div>

  <!-- Contenido a la derecha -->
  <div class="w-2/3 p-4 flex flex-col gap-2">
    <!-- Título -->
    <h3 class="font-bold text-blue-950 text-lg">Malecón del Río</h3>

    <!-- Calificación -->
    <div class="flex items-center gap-1 text-amber-500">
      <img src="/src/assets/img/star.svg" alt="estrella" class="w-4 h-4" />
      <img src="/src/assets/img/star.svg" alt="estrella" class="w-4 h-4" />
      <img src="/src/assets/img/star.svg" alt="estrella" class="w-4 h-4" />
      <img src="/src/assets/img/star.svg" alt="estrella" class="w-4 h-4" />
      <img src="/src/assets/img/star.svg" alt="estrella" class="w-4 h-4" />
    </div>

    <!-- Texto de reseña -->
    <p class="text-sm text-gray-700 leading-relaxed">
      Un lugar espectacular para caminar, disfrutar del río y ver los atardeceres. ¡Imprescindible!
    </p>

    <!-- Fecha -->
    <span class="text-xs text-gray-500">12 de mayo de 2024</span>
  </div>
</article>



          `

}
