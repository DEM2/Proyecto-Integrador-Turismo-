import { renderCurrentRoute } from "../router/AppRouter.js";

export function initializeApplication() {
  renderCurrentRoute();
  window.addEventListener("popstate", renderCurrentRoute);
}
