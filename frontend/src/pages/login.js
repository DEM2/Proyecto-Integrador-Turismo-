import { navigateTo } from "../router/router";

export function login() {
    return `
    
    

  <!-- CONTENIDO PRINCIPAL -->
  <main class="hero-bg min-h-screen bg-[url('/images/login-hero.png')] bg-cover bg-center bg-no-repeat">

    <section class="relative grid grid-cols-1 lg:grid-cols-[58%_42%]  overflow-hidden">


      <!-- LADO IZQUIERDO -->
      <aside class="relative z-10 flex items-center px-16 py-12 overflow-hidden">

          <!-- Tarjeta flotante -->
          
          </aside>

      <!-- LADO DERECHO / LOGIN -->
      <section class="relative z-10 flex items-center justify-center px-8 py-12">

        <article class="w-full max-w-110 bg-white/95 rounded-4xl shadow-2xl px-10 py-12 backdrop-blur-sm">

          <!-- Marca superior -->
          <header id="title-login" class="mb-8 flex items-center justify-center gap-3 cursor-pointer hover:border-b border-blue-200 rounded-xl">
            <h1 class="text-2xl font-sans font-bold text-blue-950">Barranquilla</h1>
            <img
              src="/images/Logo.png"
              alt="Barranquilla Explora"
              class="h-10 w-auto object-contain"
              
            />
          </header>

          <!-- Icono usuario -->
          <figure class="flex justify-center mb-6">
            <span class="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center">
              <svg class="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20 21a8 8 0 0 0-16 0"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
          </figure>

          <h2 class="text-3xl font-extrabold text-center mb-3  text-blue-950">
            Inicia sesión
          </h2>

          <p class="text-center text-slate-500 text-sm mb-8 leading-relaxed">
            Accede para guardar favoritos, descubrir eventos <br>
            y planificar tu experiencia en Barranquilla.
          </p>

          <!-- Formulario -->
          <form class="space-y-5">

            <!-- Correo -->
            <fieldset>
              <label class="block font-bold text-sm mb-2">
                Correo electrónico
              </label>

              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  class="w-full h-12 border border-slate-200 rounded-xl pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </fieldset>

            <!-- Contraseña -->
            <fieldset>
              <label class="block font-bold text-sm mb-2">
                Contraseña
              </label>

              <div class="relative">

                <input
                  type="password"
                  placeholder="Contraseña"
                  class="w-full h-12 border border-slate-200 rounded-xl pl-12 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

              </div>
            </fieldset>

            <!-- Botón ingresar -->
            <button
              type="button"
              class="w-full h-12 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 cursor-pointer transition shadow-lg shadow-blue-600/30"
            >
              Ingresar
            </button>

            <!-- Recuperar contraseña -->
            <p class="text-center">
              <a href="#" class="text-blue-600 font-semibold text-sm hover:underline">
                Recuperar contraseña
              </a>
            </p>

            <hr class="border-slate-200">

            <!-- Registro -->
            <p class="text-center text-sm text-slate-600">
              ¿No tienes cuenta?
              <a href="#" class="text-blue-600 font-bold hover:underline">
                Regístrate
              </a>
            </p>

          </form>
        </article>
      </section>
    </section>

   

  </main>
    `;
}

export function loginEvents(){
    const title = document.getElementById("title-login")

    title.addEventListener("click", ()=>{
        navigateTo("/")
    })
}
