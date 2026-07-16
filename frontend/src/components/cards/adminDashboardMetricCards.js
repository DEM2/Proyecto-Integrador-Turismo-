import { renderAdminDashboardMetricCard } from "./adminDashboardMetricCard.js";

function formatCount(value) {
  return Number(value ?? 0).toLocaleString("en-US");
}

export function renderAdminDashboardMetricCards(counts = {}) {
  const dashboardMetrics = [
    {
      title: "Usuarios",
      value: formatCount(counts.users),
      description: "Total registrados",
      actionLabel: "Ver usuarios",
      actionClass: "text-blue-700 hover:bg-sky-100",
      icon: "users",
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Eventos",
      value: formatCount(counts.events),
      description: "Total eventos",
      actionLabel: "Ver eventos",
      actionClass: "text-emerald-600 hover:bg-emerald-100",
      icon: "events",
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Sitios",
      value: formatCount(counts.places),
      description: "Total sitios",
      actionLabel: "Ver sitios",
      actionClass: "text-violet-600 hover:bg-violet-100",
      icon: "places",
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      title: "Resenas",
      value: formatCount(counts.reviews),
      description: "Total resenas",
      actionLabel: "Ver resenas",
      actionClass: "text-amber-500 hover:bg-amber-100",
      icon: "reviews",
      iconClass: "bg-amber-100 text-amber-500",
    },
    {
      title: "Solicitudes pendientes",
      value: formatCount(counts.pendingOrganizers),
      description: "Por revisar",
      actionLabel: "Ver solicitudes",
      actionClass: "text-orange-700 hover:bg-orange-200",
      icon: "requests",
      iconClass: "bg-orange-100 text-orange-500",
    },
  ];

  return `
    <section aria-label="Resumen de metricas" class="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      ${dashboardMetrics.map((metric) => renderAdminDashboardMetricCard(metric)).join("")}
    </section>
  `;
}
