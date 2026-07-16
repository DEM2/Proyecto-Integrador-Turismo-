function renderMetricIcon(icon, colorClass) {
  const iconClass = `mb-3 size-12 rounded-full p-3 ${colorClass} lg:size-10 lg:p-2.5`;

  const icons = {
    users: `
      <svg aria-hidden="true" class="${iconClass}" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5 1.34 3.5 3 3.5ZM8 11c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm8 0c-.33 0-.7.02-1.1.06 1.33.96 2.1 2.18 2.1 3.94v2h7v-2c0-2.66-5.33-4-8-4Z" />
      </svg>
    `,
    events: `
      <svg aria-hidden="true" class="${iconClass}" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.57-6 3.5V20h7.26a6.5 6.5 0 0 1-.26-1.82 6.42 6.42 0 0 1 1.28-3.86A9.84 9.84 0 0 0 12 14Zm7.5 1.5.47 1.45h1.53l-1.24.9.47 1.45-1.23-.9-1.24.9.48-1.45-1.24-.9h1.53l.47-1.45Z" />
      </svg>
    `,
    places: `
      <svg aria-hidden="true" class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    `,
    reviews: `
      <svg aria-hidden="true" class="${iconClass}" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </svg>
    `,
    requests: `
      <svg aria-hidden="true" class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect width="8" height="4" x="8" y="2" rx="1" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    `,
  };

  return icons[icon] ?? "";
}

export function renderAdminDashboardMetricCard({
  title,
  value,
  description,
  actionLabel,
  actionClass,
  icon,
  iconClass,
}) {
  return `
    <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md lg:p-4">
      ${renderMetricIcon(icon, iconClass)}
      <h2 class="text-sm font-bold text-slate-800">${title}</h2>
      <p class="mt-2 text-3xl font-extrabold lg:text-2xl">${value}</p>
      <p class="mt-1 text-sm font-medium text-slate-500">${description}</p>
      <a href="#" class="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg p-1 text-sm font-bold transition lg:mt-3 lg:py-1.5 ${actionClass}">
        ${actionLabel} <span aria-hidden="true">&rarr;</span>
      </a>
    </article>
  `;
}
