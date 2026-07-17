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
import { organizerCreateEvents, organizerCreateView } from "../pages/Profile/organizer_create_event.js";
import { renderCreatePlaceEvents, renderCreatePlaceView } from "../pages/Profile/organizer_create_place.js";
import { adminDashboardPage, adminDashboardPageEvents } from "../pages/Profile/admin.js";


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
  //Sección crear evento por el organizador
  "/perfilorganizador/createEvent": {
    render: organizerCreateView,
    events: organizerCreateEvents,
  },
  "/perfilorganizador/createPlace":{
    render: renderCreatePlaceView,
    events: renderCreatePlaceEvents
  },
    "/dashboard": {
    render: adminDashboardPage,
    events: adminDashboardPageEvents,
    needAuth: true,
    allowedRoles: ["administrador"],
  }
};
