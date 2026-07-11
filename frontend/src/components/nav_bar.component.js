
export function NAV_BAR() {
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

          <li><a id="nav-inicio" class="hover:text-blue-800 cursor-pointer" >Inicio</a></li>
          <li><a id="nav-destinos" class="hover:text-blue-800 cursor-pointer" >Destinos</a></li>
          <li><a id="nav-eventos" class="hover:text-blue-800 cursor-pointer" >Eventos</a></li>
          <li><a id="nav-nosotros" class="hover:text-blue-800 cursor-pointer" >Nosotros</a></li>

          <li>
             <a id="boton_iniciarsesion" class="hover:text-blue-800 cursor-pointer" >Iniciar Sesión</a>
          </li>
          <li >
             <a id="boton_registrarse" class="border-2 border-blue-900  rounded-lg p-1.5 pl-4 pr-4 cursor-pointer hover:bg-blue-900 hover:text-white " >Registrarse</a>
          </li>
        </ul>
      </nav>
    </header>
  `;
};

export function NavbarEvents(){

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
  // FIN
}