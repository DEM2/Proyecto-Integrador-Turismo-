import { renderIconSvg } from "../../utils/renderIcon"
export function renderHomeInfoIcon(iconFileName, description, backgroundColor) {
  return `


<article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full ${backgroundColor}"
            >
              ${renderIconSvg(iconFileName, {
                class: "size-6 text-white",
                strokeWidth: 2,
              })}
            </div>
            <p>
              ${description}
            </p>
          </article>

          `

}


export function renderHomeFeatureCard(iconFileName, title, description, backgroundColor, imageFileName, imageObjectFit = "object-cover") {
  return `

    <article class="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
            <div
              class="flex items-center justify-center w-15 h-17 shrink-0 rounded-full ${backgroundColor}"
            >
              <img
                src="/images/icons/${iconFileName}"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <div>
            <h2 class="font-bold"> ${title} </h2>
            <p>
                ${description}
            </p>
            </div>
            <img
              src="/images/${imageFileName}"
                alt="Sitios destacados"
                class="size-26 ${imageObjectFit} rounded-xl"
              />
          </article>


          `

}


export function renderFeaturedPlaceCard(site) {
  return `

    <article
      class="flex flex-col gap-2 relative bg-gray-50 rounded-xl border border-gray-300 shadow-lg shadow-sky-50 overflow-hidden cursor-pointer hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-100 ease-out"
    >
      <div class="group/mostraropcionesyopacidad">
        <img
          src="/images/hero.png"
          alt="Sitios destacados"
          class="w-full h-full object-cover group-hover/mostraropcionesyopacidad:opacity-60"
        />
        <div
          class="absolute top-3 right-3  opacity-0 max-lg:opacity-100 max-lg:bg-amber-50 rounded-lg group-hover/mostraropcionesyopacidad:opacity-100"
        >
          <button class="flex cursor-pointer items-center justify-center hover:scale-110 peer">
            <img
              src="/images/icons/3puntos.svg"
              alt="Opciones"
              class="w-5 h-5"
            />
          </button>

          <span
            class="absolute top-full right-0 mt-2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 peer-hover:opacity-100"
          >
            Opciones
          </span>
        </div>
      </div>

      <div class="pl-2 text-blue-950">
        <h2 class="font-bold">${site?.name}</h2>
        <p class="text-xs text-gray-700">
          ${site?.description}
        </p>
      </div>

      <div class="flex items-center pl-2 text-xs text-gray-700">
        <img
          src="/images/icons/location3.svg"
          alt="location_icon"
          class="w-5 h-5"
        />
        ${site?.address}
      </div>
      <br />
    </article>


          `

}


