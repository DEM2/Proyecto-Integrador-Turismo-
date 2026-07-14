import { renderHomePage, initializeHomePageEvents } from "../pages/Home/HomePage.js";
import {
  renderLoginPage,
  initializeLoginPageEvents,
} from "../pages/Authentication/LoginPage.js";
import {
  renderRegisterPage,
  initializeRegisterPageEvents,
} from "../pages/Authentication/RegisterPage.js";
import {
  initializeEventDetailPageEvents,
  renderEventDetailPage,
} from "../pages/Events/EventDetailPage.js";
import {
  renderEventsPage,
  initializeEventsPageEvents,
} from "../pages/Events/EventsPage.js";
import {
  renderExplorerProfilePage,
  initializeExplorerProfilePageEvents,
} from "../pages/Profile/ExplorerProfilePage.js";
import {
  renderOrganizerProfilePage,
  initializeOrganizerProfilePageEvents,
} from "../pages/Profile/OrganizerProfilePage.js";
import {
  initializeTouristPlacesPageEvents,
  renderTouristPlacesPage,
} from "../pages/TouristPlaces/TouristPlacesPage.js";

export const appRoutes = {
  "/": {
    render: renderHomePage,
    events: initializeHomePageEvents,
  },
  "/register": {
    render: renderRegisterPage,
    events: initializeRegisterPageEvents,
    guestOnly: true,
  },
  "/login": {
    render: renderLoginPage,
    events: initializeLoginPageEvents,
    guestOnly: true,
  },
  "/destinos": {
    render: renderTouristPlacesPage,
    events: initializeTouristPlacesPageEvents,
  },
  "/event": {
    render: renderEventsPage,
    events: initializeEventsPageEvents,
  },
  "/perfilorganizador": {
    render: renderOrganizerProfilePage,
    events: initializeOrganizerProfilePageEvents,
    needAuth: true,
    allowedRoles: ["organizador"],
  },
  "/perfilexplorador": {
    render: renderExplorerProfilePage,
    events: initializeExplorerProfilePageEvents,
    needAuth: true,
    allowedRoles: ["explorador"],
  },
  "/detailEvent": {
    render: renderEventDetailPage,
    events: initializeEventDetailPageEvents,
  },
};
