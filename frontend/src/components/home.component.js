
export function INFO_ICONS_HOME(svg, parrafo,bgcolor) {
  return `


<article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full ${bgcolor}"
            >
              <img
                src="/src/assets/img/${svg}"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <p>
              ${parrafo}
            </p>
          </article>

          `

}


export function INFO_ICONS_HOME2(svg,titulo, parrafo,bgcolor,img, img_contain="object-cover") {
  return `

    <article class="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
            <div
              class="flex items-center justify-center w-15 h-17 shrink-0 rounded-full ${bgcolor}"
            >
              <img
                src="/src/assets/img/${svg}"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <div>
            <h2 class="font-bold"> ${titulo} </h2>
            <p>
                ${parrafo}
            </p>
            </div>
            <img
                src="/src/assets/img/${img}"
                alt="Sitios destacados"
                class="size-26 ${img_contain} rounded-xl"
              />
          </article>


          `

}


export function SITIOS_DESTACADOS() {
  return `

        <article class="flex flex-col gap-2  bg-gray-50  rounded-xl border border-gray-300 shadow-lg shadow-gray-200 overflow-hidden cursor-pointer 
          hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-100 ease-out">
            
              <img
                src="/src/assets/img/hero.png"
                alt="Sitios destacados"
                class="w-full max-h-2/3"
              />

            <div class="pl-2 text-blue-950">
            <h2 class="font-bold"> Gran Malecón del Río  </h2>
            <p class="text-xs text-gray-700">
                Paseo turístico a orillas del río Magdalena.
            </p>
            </div>
            <div class=" flex items-center pl-2 text-xs text-gray-700">
            <img
                src="/src/assets/img/location3.svg"
                alt="Sitios destacados"
                class="w-5 h-5"
              />
            Riomar
            </div>
          </article>

          `

}


export function EVENTOS_DESTACADOS() {
  return `

          <article class="flex flex-col gap-2  bg-gray-50  rounded-xl border border-gray-300 shadow-lg shadow-gray-200 overflow-hidden cursor-pointer 
          hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-100 ease-out">
            
              <img
                src="/src/assets/img/hero.png"
                alt="Sitios destacados"
                class="w-full max-h-2/3"
              />

            <div class="pl-2 text-blue-950">
            <h2 class="font-bold"> Gran Malecón del Río  </h2>
            <p class="text-xs text-gray-700">
                Paseo turístico a orillas del río Magdalena.
            </p>
            </div>
            <div class=" flex items-center pl-2 text-xs text-gray-700">
            <img
                src="/src/assets/img/location3.svg"
                alt="Sitios destacados"
                class="w-5 h-5"
              />
            Riomar
            </div>
          </article>

          `

}