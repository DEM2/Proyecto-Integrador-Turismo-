
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