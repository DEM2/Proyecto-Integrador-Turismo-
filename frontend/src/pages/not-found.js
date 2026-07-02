import { navigateTo } from "../router/router";
export function notFound() {
  return `
  <main class="flex min-h-screen items-center justify-center px-6 py-10">
      <section class="w-full max-w-2xl rounded-[2rem] border border-blue-100 bg-white p-10 text-center shadow-xl shadow-blue-100/70">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Error de navegacion</p>
        <h1 class="mt-4 text-6xl font-black tracking-tight text-slate-900">404</h1>
        <p class="mt-4 text-lg text-slate-600">La vista que intentas abrir no existe o todavia no esta disponible dentro del proyecto.</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500 cursor-pointer" id="btn-home" >Ir a home</a>
          <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 cursor-pointer" id="btn-login">Volver al login</a>
        </div>
      </section>
    </main>
  `;
}

export function notFoundEvents() {
  const home = document.getElementById("btn-home");
  const login = document.getElementById("btn-login");
  if (home || login) {
    home.addEventListener("click", () => {
      navigateTo("/");
    });
    login.addEventListener("click", () => {
      navigateTo("/login");
    });
  }
}
