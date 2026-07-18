import { authMiddleware, guestMiddleware, roleMiddleware } from "../middleware/routeGuards.js";
import { chatbotEvents } from "../components/chatbot/chatbot.events.js";
import { chatbot } from "../components/chatbot/chatbot.js";
import { initializeNotFoundPageEvents, renderNotFoundPage } from "../pages/NotFound/NotFoundPage.js";
import { getSession } from "../services/authService.js";
import { appRoutes } from "./AppRoutes.js";

export async function renderCurrentRoute() {
  const app = document.getElementById("app");
  const chatbotRoot = document.getElementById("chatbot-root");
  const path = window.location.pathname;
  const route = appRoutes[path];

  chatbotRoot.innerHTML = "";

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

  const pageMarkup = await route.render();
  const shouldRenderChatbot = Boolean(session && route.authenticatedChatbot);

  app.innerHTML = pageMarkup;
  chatbotRoot.innerHTML = shouldRenderChatbot ? chatbot() : "";
  app.classList.remove("page-transition");
  void app.offsetWidth;
  app.classList.add("page-transition");
  route.events();

  if (shouldRenderChatbot) {
    chatbotEvents();
  }
}

export function navigateTo(path, { force = false } = {}) {
  if (window.location.pathname === path) {
    if (force) renderCurrentRoute();
    return;
  }

  history.pushState({}, "", path);
  renderCurrentRoute();
}
