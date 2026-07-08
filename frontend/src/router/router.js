import { routes } from "./routes.js";
import { notFound, notFoundEvents } from "../pages/not-found.js";
import { getSession } from "../services/auth.service.js";
import { authMiddleware, guestMiddleware, roleMiddleware } from "../middleware/middleware.js";

export function router() {
  const app = document.getElementById("app");
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    app.innerHTML = notFound();
    notFoundEvents();
  } else {
    const sesion = getSession();
    // Ejecutar los middleware
    const middlewares = [
      authMiddleware(sesion, route),
      guestMiddleware(sesion, route),
      roleMiddleware(sesion, route)
    ];

    for (const middleware of middlewares) {
      const result = middleware;
      if (!result.allowed) {
        navigateTo(result.redirect);
        return;
      }
    }

    // Si todos los middleware pasaron, renderizar
    app.innerHTML = route.render();
    route.events();
  }
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  router();
}
