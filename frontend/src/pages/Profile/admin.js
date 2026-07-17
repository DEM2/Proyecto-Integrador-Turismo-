import { renderAdminDashboardMetricCards, renderAdminDashboardMetricCardsEvents } from "../../components/cards/adminDashboardMetricCards.js";
import { renderAdminDashboardPendingRequests } from "../../components/cards/adminDashboardPendingRequests.js";
import { renderAdminDashboardQuickActions, renderAdminDashboardQuickActionsEvents } from "../../components/cards/adminDashboardQuickActions.js";
import { renderAdminDashboardRecentReviews, renderAdminDashboardRecentReviewsEvents } from "../../components/cards/adminDashboardRecentReviews.js";
import { renderAdminDashboardSidebar, renderAdminDashboardSidebarEvents } from "../../components/cards/adminDashboardSidebar.js";

export async function adminDashboardPage() {
  const [metricCards, pendingRequests, recentReviews] = await Promise.all([
    renderAdminDashboardMetricCards(),
    renderAdminDashboardPendingRequests(),
    renderAdminDashboardRecentReviews(),
  ]);

  return `
    <main class="min-h-screen bg-slate-50 font-sans text-slate-950 lg:grid lg:h-screen lg:grid-cols-[17rem_1fr] lg:overflow-hidden">
      ${renderAdminDashboardSidebar()}

      <section id="admin-dashboard-content" class="flex flex-col px-6 py-6 lg:h-screen lg:overflow-hidden lg:px-8 lg:py-4" aria-labelledby="admin-dashboard-title">
        <header class="mb-3 flex flex-col gap-4 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 id="admin-dashboard-title" class="text-3xl font-extrabold text-slate-950 lg:text-2xl">Dashboard</h1>
            <p class="mt-1 text-base font-medium text-slate-500 lg:text-sm">Bienvenido, Administrador <span aria-hidden="true">&#128075;</span></p>
          </div>

          <section aria-label="Cuenta de administrador" class="flex items-center gap-5">
            <button type="button" class="flex cursor-pointer items-center gap-3 border-l border-slate-200 pl-5 font-semibold text-slate-800">
              <img src="/images/login-hero.png" alt="" class="size-11 rounded-full object-cover" />
              <span>Administrador</span>
            </button>
          </section>
        </header>

        ${metricCards}

        <section class="mt-3 grid min-h-0 flex-1 gap-3 xl:grid-cols-[1fr_1fr]" aria-label="Actividad pendiente y reciente">
          ${pendingRequests}
          ${recentReviews}
        </section>

        ${renderAdminDashboardQuickActions()}
      </section>
    </main>
  `;
}

export function adminDashboardPageEvents() {
  renderAdminDashboardSidebarEvents();
  renderAdminDashboardMetricCardsEvents();
  renderAdminDashboardRecentReviewsEvents();
  renderAdminDashboardQuickActionsEvents();
}
