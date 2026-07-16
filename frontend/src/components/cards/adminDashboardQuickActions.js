export function renderAdminDashboardQuickActions() {
  return `
    <section aria-labelledby="quick-actions-title" class="mt-3 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
      <h2 id="quick-actions-title" class="mb-2 text-xl font-extrabold lg:text-base">Acciones rapidas</h2>
      <ul class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <li>
          <a href="#" class="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <svg aria-hidden="true" class="size-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <span class="text-sm font-semibold text-slate-500">
              <span class="block text-base font-extrabold text-blue-600">Crear sitio</span>
              Agregar un nuevo sitio
            </span>
          </a>
        </li>

        <li>
          <a href="#" class="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <svg aria-hidden="true" class="size-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span class="text-sm font-semibold text-slate-500">
              <span class="block text-base font-extrabold text-blue-600">Ver usuarios</span>
              Gestionar usuarios
            </span>
          </a>
        </li>

        <li>
          <a href="#" class="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <svg aria-hidden="true" class="size-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span class="text-sm font-semibold text-slate-500">
              <span class="block text-base font-extrabold text-blue-600">Gestionar sitios</span>
              Ver todos los sitios
            </span>
          </a>
        </li>

        <li>
          <a href="#" class="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <svg aria-hidden="true" class="size-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
            </svg>
            <span class="text-sm font-semibold text-slate-500">
              <span class="block text-base font-extrabold text-blue-600">Gestionar resenas</span>
              Ver todas las resenas
            </span>
          </a>
        </li>

        <li>
          <a href="#" class="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <svg aria-hidden="true" class="size-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect width="8" height="4" x="8" y="2" rx="1" />
            </svg>
            <span class="text-sm font-semibold text-slate-500">
              <span class="block text-base font-extrabold text-blue-600">Ver solicitudes</span>
              Revisar pendientes
            </span>
          </a>
        </li>
      </ul>
    </section>
  `;
}
