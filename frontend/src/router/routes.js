import { home, homeEvents } from "../pages/home.js";
import { register, registerEvents } from "../pages/register.js";
import { login, loginEvents } from "../pages/login.js";
import { event,eventEvents} from "../pages/event.js";
import { perfilExplorador, perfilExploradorEvents } from "../pages/perfil_explorador.js";
import { perfilOrganizador, perfilOrganizadorEvents } from "../pages/perfil_organizador.js";
import { eventViewDetailEvent, renderViewDetailEvent } from "../pages/detailViewEvent.js";

import { destiation_event, destination } from "../pages/destination_view.js";
import { organizerCreateEvents, organizerCreateView } from "../pages/organizer_create_event.js";
import { renderCreatePlaceView } from "../pages/organizer_create_place.js";


export const routes = {
  "/": {
    render: home,
    events: homeEvents,
  },
  "/register": {
    render: register,
    events: registerEvents,
    guestOnly: true
  },
  "/login": {
    render : login,
    events : loginEvents,
    guestOnly: true
  },
  "/destinos":{
     render: destination,
     events: destiation_event
  },
  "/event": {
    render: event,
    events: eventEvents,
  },
  "/perfilorganizador": {
    render: perfilOrganizador,
    events: perfilOrganizadorEvents,
  },
  //Sección crear evento por el organizador
  "/perfilorganizador/createEvent": {
    render: organizerCreateView,
    events: organizerCreateEvents,
  },
  "/perfilorganizador/createPlace":{
    render: renderCreatePlaceView
  },
  
  "/perfilexplorador": {
    render: perfilExplorador,
    events: perfilExploradorEvents,
  //Se añadio ruta de detalle de eventos
  },
  "/detailEvent": {
    render: renderViewDetailEvent,
    events: eventViewDetailEvent,
  }
};

