import { navigateTo } from "../router/router";
export function home() {
  return `
    
     <header
      class=" NAVEGACION  font-sans text-blue-950 flex items-center justify-between h-20 pl-4 sm:pl-6 md:pl-10 pr-2 sm:pr-4 md:pr-8 bg-gray-50"
    >
      <figure class="w-60 flex items-center gap-4">
        <h1 class="text-3xl font-bold max-md:text-2xl">Barranquilla</h1>
        <img class="w-32 max-md:w-28" src="/src/assets/img/logo.png" alt="Logo">
      </figure>
      <nav class="">
      <img 
          id="boton_menu"
          class="  size-8 cursor-pointer max-lg:block hidden"
          src="/src/assets/img/menu.svg">
          
        <ul 
        id="navegacion"
        class="flex items-center gap-4 font-medium  max-lg:hidden">
          <img 
          id="boton_equis"
          class="  size-8 cursor-pointer hidden max-lg:block "
          src="/src/assets/img/equis.svg">

          <li><a href="">Inicio</a></li>
          <li><a href="">Destinos</a></li>
          <li><a href="">Eventos</a></li>
          <li><a href="">Nosotros</a></li>

          <li>
             <a href="">Iniciar Sesión</a>
          </li>
          <li class="border-2 border-blue-900  rounded-lg p-2 hover:bg-blue-900 hover:text-white ">
             <a href="">Registrarse</a>
          </li>
        </ul>
      </nav>
    </header>


    <main class="w-full flex flex-col gap-4 font-sans">
      <section class="  HERO      w-full h-120 relative">
        <img
          class="w-full h-full object-cover"
          src="/src/assets/img/hero3.png"
          alt="Hero Image"
        />
        <p class="absolute bottom-1/2 left-1/9 text-blue-950">
          <span class="font-medium text-5xl"> Descubre la magia. </span><br />
          <span class="font-extralight text-lg">
            Explora, vive y disfruta todo lo que <br />
            nuestra ciudad tiene <b>para ti</b>.
          </span>
        </p>
      </section>

      <section class="   IZQUIERDOYDERECHA     pl-10 pr-10   xl:h-70 lg: h-150   items-stretch grid grid-cols-1 xl:grid-cols-2  gap-4">
        <aside class="  IZQUIERDO    bg-blue-100">
          <figure class="flex items-center gap-3">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700"
            >
              <img
                class="h-5 w-5"
                src="/src/assets/img/location.svg"
                alt="Icono de sitios destacados"
              />
            </div>

            <figcaption>
              <h2 class="text-2xl font-bold text-blue-700">
                Sitios Destacados
              </h2>
            </figcaption>
          </figure>
        </aside>

        <aside class="  DERECHA    bg-orange-100">
          <figure class="flex items-center gap-3">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-red-500"
            >
              <img
                class="h-5 w-5"
                src="/src/assets/img/calendar.svg"
                alt="Icono de eventos destacados"
              />
            </div>

            <figcaption>
              <h2 class="text-2xl font-bold text-red-500">
                Eventos Destacados
              </h2>
            </figcaption>
          </figure>
        </aside>
      </section>

      <section
        class="     INFOICONS     max-w-full p-2 ml-10 mr-10 bg-gray-50 border border-gray-200 rounded-3xl text-blue-900 font-medium text-sm"
      >
        <h2 class="font-medium text-2xl text-blue-900 pl-5">
          ¿Por qué usar Barranquilla explora?
        </h2>
        <figure class="items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 p-2">

          <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-blue-600"
            >
              <img
                src="/src/assets/img/places.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <p>
              Descubre lugares icónicos y también menos visibles.
            </p>
          </article>

         <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-red-500"
            >
              <img
                src="/src/assets/img/music.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Consulta eventos culturales, gastronómicos y deportivos.
            </p>
          </article>


          <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200 hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-yellow-500"
            >
              <img
                src="/src/assets/img/safe.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Encuentra información confiable y actualizada.
            </p>
          </article>


          <article class="flex items-center gap-3 bg-white p-5 rounded-3xl shadow-lg shadow-gray-200  hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-green-500"
            >
              <img
                src="/src/assets/img/heart.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Planifica y guarda tus itinerarios.
            </p>
          </article>


          <article class="flex items-center gap-3 bg-white  p-5 rounded-3xl shadow-lg shadow-gray-200  hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-purple-500"
            >
              <img
                src="/src/assets/img/people.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Conecta con experiencias locales auténticas y memorables.
            </p>
          </article>


          <article class="flex items-center gap-3 bg-white  p-5 rounded-3xl shadow-lg shadow-gray-200  hover:bg-sky-50 h-full">
            <div
              class="flex items-center justify-center size-15 shrink-0 rounded-full bg-orange-500"
            >
              <img
                src="/src/assets/img/shop.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>

            <p>
              Impulsa el turismo local y la visibilidad de emprendimientos.
            </p>
            
          </article>

        </figure>
      </section>







     <section
        class="  INFOICONS2       max-w-full  ml-8 mr-8 text-blue-900 font-medium text-sm"
      >
        
        <figure class="items-stretch grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-2">


          <article class="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
            <div
              class="flex items-center justify-center w-15 h-17 shrink-0 rounded-full bg-amber-100"
            >
              <img
                src="/src/assets/img/store.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <div>
            <h2 class="font-bold"> Apoya negocios locales </h2>
            <p>
              Con cada visita y recomendación impulsas a emprendedores y comercios de nuestra ciudad.
            </p>
            </div>
            <img
                src="/src/assets/img/negocios_locales.webp"
                alt="Sitios destacados"
                class="size-26 object-cover rounded-xl"
              />
          </article>

         <article class="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
            <div
              class="flex items-center justify-center w-15 h-17 shrink-0 rounded-full bg-blue-200"
            >
              <img
                src="/src/assets/img/people2.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <div>
            <h2 class="font-bold"> Reseñas de usuarios </h2>
            <p>
              Conoce opiniones reales de viajeros y locales para tomar mejores decisiones.
            </p>
            </div>
            <img
                src="/src/assets/img/estrella2.png"
                alt="Sitios destacados"
                class="size-26 object-contain rounded-xl"
              />
          </article>




          <article class="flex gap-2 items-center bg-gray-50 p-2  rounded-lg">
            <div
              class="flex items-center justify-center w-15 h-17 shrink-0 rounded-full bg-green-200"
            >
              <img
                src="/src/assets/img/location2.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <div>
            <h2 class="font-bold"> Itinerarios sugeridos </h2>
            <p>
              Rutas listas para que disfrutes lo mejor de Barranquilla en poco tiempo.
            </p>
            </div>
            <img
                src="/src/assets/img/itinerario.webp"
                alt="Sitios destacados"
                class="size-26 object-cover rounded-xl"
              />
          </article>




          <article class="flex gap-2 items-center bg-gray-50 p-2  rounded-lg">
            <div
              class="flex items-center justify-center w-15 h-17 shrink-0 rounded-full bg-purple-200"
            >
              <img
                src="/src/assets/img/family.svg"
                alt="Sitios destacados"
                class="w-8 h-8"
              />
            </div>
            <div>
            <h2 class="font-bold"> Experiencias para todos </h2>
            <p>
              Planes para parejas, familia, amigos y aventureros. ¡Tú eliges cómo vivir la ciudad!
            </p>
            </div>
            <img
                src="/src/assets/img/familias.webp"
                alt="Sitios destacados"
                class="size-26 object-cover rounded-xl"
              />
          </article>


          

        </figure>
      </section>



    <section class="text-blue-900 font-medium xl:text-2xl  p-2 ml-10 mr-10 flex justify-center"> 
        <img class="w-16 mb-4" src="/src/assets/img/chispitas2.png" alt="Icono de corazón" />
        <p>
        Barranquilla te espera.&nbsp; <b> Explora, vive <span class="text-red-600"> y comparte</span> </b> lo mejor de nuestra ciudad.
        </p>
        <img class="w-16 mb-4" src="/src/assets/img/chispitas_derecho.png" alt="Icono de corazón" />
    </section>




    </main>

    <footer></footer>
    `;
}

export function homeEvents() {


  //Mostrar menú de navegación en versión móvil
  const boton = document.getElementById("boton_menu");
  const navegacion = document.getElementById("navegacion");
  const equis = document.getElementById("boton_equis");

  boton.addEventListener("click", funcionMenu);
  equis.addEventListener("click", funcionMenu);

  function funcionMenu() {
    navegacion.classList.toggle("active");
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navegacion.classList.remove("active");
    }
  });

}




