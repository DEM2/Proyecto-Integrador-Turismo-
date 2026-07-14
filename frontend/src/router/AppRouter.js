import { authMiddleware, guestMiddleware, roleMiddleware } from "../middleware/routeGuards.js";
import { initializeNotFoundPageEvents, renderNotFoundPage } from "../pages/NotFound/NotFoundPage.js";
import { getSession } from "../services/authService.js";
import { appRoutes } from "./AppRoutes.js";

export async function renderCurrentRoute() {
  const app = document.getElementById("app");
  const path = window.location.pathname;
  const route = appRoutes[path];

  if (!route) {
    app.innerHTML = renderNotFoundPage();
    initializeNotFoundPageEvents();
    return;
  }

  const session = getSession();
  const routeGuards = [
    authMiddleware(session, route),
    guestMiddleware(session, route),
    roleMiddleware(session, route),
  ];

  for (const guardResult of routeGuards) {
    if (!guardResult.allowed) {
      navigateTo(guardResult.redirect);
      return;
    }
  }

  app.innerHTML = await route.render();
  route.events();
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  renderCurrentRoute();
}
