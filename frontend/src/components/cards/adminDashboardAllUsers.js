import {
  getAdminDashboardAllUsers,
  updateAdminDashboardUser,
} from "../../services/adminDashboard.service.js";
import { renderAdminDashboardUserItem } from "./adminDashboardUserItem.js";

export async function renderAdminDashboardAllUsers() {
  let users = [];

  try {
    users = await getAdminDashboardAllUsers();
  } catch (error) {
    return `
      <header class="mb-4 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Usuarios</h1>
        <p class="mt-1 text-base font-medium text-red-600 lg:text-sm">
          No se pudieron cargar los usuarios.
        </p>
      </header>
    `;
  }

  let userItems = "";

  if (users.length > 0) {
    userItems = users.map((user) => renderAdminDashboardUserItem(user)).join("");
  } else {
    userItems = `
      <li class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
        No hay usuarios para mostrar.
      </li>
    `;
  }

  return `
    <header class="mb-4 border-b border-slate-200 pb-4">
      <h1 class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Usuarios</h1>
      <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">
        Todos los usuarios registrados en la pagina
      </p>
    </header>

    <section class="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Filtros de usuarios">
      <label class="text-sm font-bold text-slate-700">
        Usuario
        <input id="filter-user-name" type="search" placeholder="Nombre" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Correo
        <input id="filter-user-email" type="search" placeholder="Correo" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Rol
        <input id="filter-user-role" type="search" placeholder="Rol" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Estado
        <select id="filter-user-active" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </label>
    </section>

    <section id="admin-all-users" class="min-h-0 flex-1 overflow-y-auto" aria-labelledby="admin-all-users-title">
      <h2 id="admin-all-users-title" class="sr-only">Todos los usuarios</h2>
      <ul class="space-y-3">
        ${userItems}
      </ul>
    </section>
  `;
}

export function renderAdminDashboardAllUsersEvents() {
  const usersSection = document.getElementById("admin-all-users");
  const filterUserName = document.getElementById("filter-user-name");
  const filterUserEmail = document.getElementById("filter-user-email");
  const filterUserRole = document.getElementById("filter-user-role");
  const filterUserActive = document.getElementById("filter-user-active");

  if (!usersSection) {
    return;
  }

  function filterUsers() {
    const nameValue = filterUserName.value.trim().toLowerCase();
    const emailValue = filterUserEmail.value.trim().toLowerCase();
    const roleValue = filterUserRole.value.trim().toLowerCase();
    const activeValue = filterUserActive.value;
    const userItems = usersSection.querySelectorAll("[data-admin-user-item='true']");

    userItems.forEach((userItem) => {
      const userFullName = userItem.dataset.userFullName || "";
      const userEmail = userItem.dataset.userEmail || "";
      const userRole = userItem.dataset.userRole || "";
      const userActive = userItem.dataset.userActive || "";

      const matchName = !nameValue || userFullName.includes(nameValue);
      const matchEmail = !emailValue || userEmail.includes(emailValue);
      const matchRole = !roleValue || userRole.includes(roleValue);
      const matchActive = !activeValue || userActive === activeValue;

      if (matchName && matchEmail && matchRole && matchActive) {
        userItem.classList.remove("hidden");
      } else {
        userItem.classList.add("hidden");
      }
    });
  }

  filterUserName.addEventListener("input", filterUsers);
  filterUserEmail.addEventListener("input", filterUsers);
  filterUserRole.addEventListener("input", filterUsers);
  filterUserActive.addEventListener("change", filterUsers);

  usersSection.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-user='true']");
    const cancelButton = event.target.closest("[data-cancel-user-edit='true']");

    if (editButton) {
      const userItem = editButton.closest("[data-admin-user-item='true']");

      if (!userItem) {
        return;
      }

      const currentForm = userItem.querySelector("[data-user-edit-form='true']");

      if (currentForm) {
        currentForm.remove();
        return;
      }

      userItem.insertAdjacentHTML("beforeend", renderAdminDashboardUserEditForm(userItem));
    }

    if (cancelButton) {
      const form = cancelButton.closest("[data-user-edit-form='true']");

      if (form) {
        form.remove();
      }
    }
  });

  usersSection.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-user-edit-form='true']");

    if (!form) {
      return;
    }

    event.preventDefault();

    const userItem = form.closest("[data-admin-user-item='true']");

    if (!userItem) {
      return;
    }

    const saveButton = form.querySelector("[data-save-user-edit='true']");
    const userId = userItem.dataset.userId;
    const fields = form.elements;

    const userData = {
      name: fields.name.value.trim(),
      last_name: fields.last_name.value.trim(),
      email: fields.email.value.trim(),
      is_active: fields.is_active.value === "true",
    };

    try {
      saveButton.disabled = true;
      saveButton.textContent = "Guardando...";

      await updateAdminDashboardUser(userId, userData);

      const dashboardContent = document.getElementById("admin-dashboard-content");

      if (!dashboardContent) {
        return;
      }

      dashboardContent.innerHTML = await renderAdminDashboardAllUsers();
      renderAdminDashboardAllUsersEvents();
    } catch (error) {
      saveButton.disabled = false;
      saveButton.textContent = "Guardar cambios";
      alert("No se pudo actualizar el usuario. Intenta de nuevo.");
    }
  });
}

function renderAdminDashboardUserEditForm(userItem) {
  return `
    <form data-user-edit-form="true" class="col-span-full mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2 xl:grid-cols-4">
      <label class="text-sm font-bold text-slate-700">
        Nombre
        <input name="name" type="text" value="${userItem.dataset.userNameTitle || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Apellido
        <input name="last_name" type="text" value="${userItem.dataset.userLastNameTitle || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Correo
        <input name="email" type="email" value="${userItem.dataset.userEmailTitle || ""}" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Rol
        <input type="text" value="${userItem.dataset.userRoleTitle || ""}" disabled class="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500" />
      </label>

      <label class="text-sm font-bold text-slate-700">
        Estado
        <select name="is_active" class="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
          <option value="true" ${userItem.dataset.userActive === "true" ? "selected" : ""}>Activo</option>
          <option value="false" ${userItem.dataset.userActive === "false" ? "selected" : ""}>Inactivo</option>
        </select>
      </label>

      <div class="flex gap-2 md:col-span-2 xl:col-span-4">
        <button type="submit" data-save-user-edit="true" class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
          Guardar cambios
        </button>
        <button type="button" data-cancel-user-edit="true" class="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
          Cancelar
        </button>
      </div>
    </form>
  `;
}
