import { navigateTo } from "../router/router";
import { postUser } from "../services/users.service";
export function register() {
  return `

        <!-- LADO DERECHO / REGISTER -->
<main class="relative z-10 flex items-center justify-center px-8 py-12 min-h-screen ">

  <section class="w-full max-w-180 bg-white/95 rounded-4xl shadow-2xl px-10 py-10 backdrop-blur-sm">

    <!-- Marca superior -->
    <header id="title-register" class="mb-6 flex items-center justify-center gap-3 cursor-pointer hover:border-b border-blue-200 rounded-xl">
      <h1 class="text-2xl font-sans font-bold text-blue-950">
        Barranquilla
      </h1>

      <img
        src="/images/Logo.png"
        alt="Barranquilla Explora"
        class="h-10 w-auto object-contain"
      />
    </header>

    <!-- Icono Registro -->
    <figure class="flex justify-center mb-5">
      <span class="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center">

        <svg
          class="h-10 w-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19a6 6 0 10-12 0"
          />

          <circle
            cx="9"
            cy="7"
            r="4"
          />

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 8v6"
          />

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16 11h6"
          />
        </svg>

      </span>
    </figure>

    <h2 class="text-3xl font-extrabold text-center text-blue-950 mb-2">
      Crea tu cuenta
    </h2>

    <p class="text-center text-slate-500 text-sm mb-8">
      Únete a Barranquilla Explora y descubre lo mejor de la ciudad.
    </p>

    <form id="register-form" class="space-y-5">

      <!-- Nombre / Apellido -->
      <fieldset class="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label class="block font-bold text-sm mb-2">
            Nombre
          </label>

          <input required id="register-name"
            type="text"
            placeholder="Tu nombre"
            class="w-full h-12 border border-slate-200 rounded-xl pl-4 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="block font-bold text-sm mb-2">
            Apellido
          </label>

          <input required id="register-lastname"
            type="text"
            placeholder="Tu apellido"
            class="w-full h-12 border border-slate-200 rounded-xl pl-4 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

      </fieldset>

      <!-- Correo -->
      <fieldset>

        <label class="block font-bold text-sm mb-2">
          Correo electrónico
        </label>

        <input required id="register-email"
          type="email"
          placeholder="ejemplo@correo.com"
          class="w-full h-12 border border-slate-200 rounded-xl pl-4 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

      </fieldset>

      <!-- Contraseña -->
      <fieldset class="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>

          <label class="block font-bold text-sm mb-2">
            Contraseña
          </label>

          <input required id="register-password"
            type="password"
            placeholder="Crea una contraseña"
            class="w-full h-12 border border-slate-200 rounded-xl pl-4 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

        </div>

        <div>

          <label class="block font-bold text-sm mb-2">
            Confirmar contraseña
          </label>

          <input required
            type="password"
            placeholder="Repite tu contraseña"
            class="w-full h-12 border border-slate-200 rounded-xl pl-4 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

        </div>

      </fieldset>

      <!-- Botón -->

      <button
        type="submit"
        class="w-full h-12 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 cursor-pointer transition shadow-lg shadow-blue-600/30"
      >
        Crear cuenta
      </button>

      <!-- Separador -->

      <section class="flex items-center gap-4 py-2">

        <hr class="flex-1 border-slate-200">

        <span class="text-sm text-slate-400 whitespace-nowrap">
          o continúa con
        </span>

        <hr class="flex-1 border-slate-200">

      </section>

      <!-- Google -->

      <button
        type="button"
        class="w-full h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition cursor-pointer"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          class="w-6 h-6"
        >
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2c-2 1.4-4.5 2.5-7.3 2.5-5.2 0-9.6-3.3-11.2-8H6.5C9.7 37.3 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.6-6 7.3l6.2 5.2C39.8 36.8 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
        </svg>

        <span class="font-medium">
          Google
        </span>

      </button>

      <!-- Login -->

      <p class="text-center text-sm text-slate-600">

        ¿Ya tienes una cuenta?

        <a id="boton-iniciarsesion"
          class="text-blue-600 font-bold cursor-pointer hover:underline"
        >
          Inicia sesión
        </a>

      </p>

    </form>

  </section>

</main>
    `;
}

export function registerEvents() {

  const title = document.getElementById("title-register")
  const login = document.getElementById("boton-iniciarsesion")
  title.addEventListener("click", () => {
    navigateTo("/")
  });
  login.addEventListener("click", () => {
    navigateTo("/login")
  });

  //Funcionalidad de registrar usuarios

    const form = document.getElementById("register-form");
  
    const name = document.getElementById("register-name");
    const lastname = document.getElementById("register-lastname");
    const email = document.getElementById("register-email");
    const password = document.getElementById("register-password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = {
      name: name.value,
      last_name: lastname.value,
      email: email.value,
      password: password.value
    };

    try {
      const response = await postUser(user)
      if(response){
        alert("Usuario registrado exitosamente");
       // navigateTo("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }

  });
  // FINNNNNN Funcionalidad de registrar usuarios

}

