import { navigateTo } from "../../router/AppRouter.js";
import { postUser } from "../../services/registrationService.js";
import { alertaError, alertaExitosa } from "../../utils/alerts.js";

export function renderRegisterPage() {
  return `

        <!-- LADO DERECHO / REGISTER -->
<main class="auth-register-page relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:px-8 md:py-12">

  <section class="w-full max-w-180 bg-white/95 rounded-4xl shadow-2xl px-5 py-7 backdrop-blur-sm md:px-10 md:py-10">

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

      <!-- Tipo de cuenta -->
      <fieldset>
        <label for="register-role" class="block font-bold text-sm mb-2">
          Tipo de cuenta
        </label>

        <select
          required
          id="register-role"
          class="w-full h-12 cursor-pointer border border-slate-200 rounded-xl px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >
          <option value="1">Explorador</option>
          <option value="2">Organizador</option>
        </select>

        <p class="mt-2 text-xs text-slate-500">
          Las cuentas de organizador deben ser aprobadas por un administrador.
        </p>
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

        <span class="text-sm text-slate-400 whitespace-nowrap"></span>

        <hr class="flex-1 border-slate-200">

      </section>  

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


export function initializeRegisterPageEvents() {

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
    const role = document.getElementById("register-role");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = {
      name: name.value,
      last_name: lastname.value,
      email: email.value,
      password: password.value,
      id_role: Number(role.value)
    };

    try {
      const response = await postUser(user)
      if(response){
        const message = user.id_role === 2
          ? "Solicitud enviada. Debes esperar la aprobacion del administrador."
          : "Usuario registrado exitosamente";

        alertaExitosa(message);
        navigateTo("/login");
      }
    } catch (error) {
      alertaError(error.message);
    }

  });
  // FINNNNNN Funcionalidad de registrar usuarios

}
