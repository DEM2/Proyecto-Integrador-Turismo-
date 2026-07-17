export function renderAdminDashboardUserItem(user) {
  function formatAttribute(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  }

  const userId = user.id || "";
  const userName = user.name || "Usuario";
  const userLastName = user.last_name || "";
  const userEmail = user.email || "Sin correo";
  const roleId = user.id_role || "";
  const roleName = user.role_name || "Sin rol";
  const isActive = user.is_active !== false;

  let activeLabel = "";

  if (isActive) {
    activeLabel = `
      <span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
        Activo
      </span>
    `;
  }

  if (!isActive) {
    activeLabel = `
      <span class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
        Inactivo
      </span>
    `;
  }

  return `
    <li
      class="grid gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:grid-cols-[1fr_auto]"
      data-admin-user-item="true"
      data-user-id="${userId}"
      data-user-name="${userName.toLowerCase()}"
      data-user-last-name="${userLastName.toLowerCase()}"
      data-user-full-name="${`${userName} ${userLastName}`.toLowerCase()}"
      data-user-email="${userEmail.toLowerCase()}"
      data-user-role-id="${roleId}"
      data-user-role="${roleName.toLowerCase()}"
      data-user-active="${isActive}"
      data-user-name-title="${formatAttribute(userName)}"
      data-user-last-name-title="${formatAttribute(userLastName)}"
      data-user-email-title="${formatAttribute(userEmail)}"
      data-user-role-title="${formatAttribute(roleName)}"
    >
      <article>
        <div class="flex flex-wrap gap-2">
          ${activeLabel}
          <span class="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            ${roleName}
          </span>
        </div>
        <h3 class="mt-3 font-extrabold text-slate-800 lg:text-sm">
          ${userName} ${userLastName}
        </h3>
        <p class="mt-1 text-sm font-medium text-slate-600">
          ${userEmail}
        </p>
      </article>

      <div class="text-left lg:text-right">
        <button
          type="button"
          data-edit-user="true"
          class="mt-3 cursor-pointer rounded-lg border border-blue-200 px-3 py-1 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
        >
          Editar
        </button>
      </div>
    </li>
  `;
}
