import { home, homeEvents } from "../pages/home.js";
import { register, registerEvents } from "../pages/register.js";
import { login, loginEvents } from "../pages/login.js";
import { event,eventEvents} from "../pages/event.js";
import { perfilExplorador, perfilExploradorEvents } from "../pages/perfil_explorador.js";
import { perfilOrganizador, perfilOrganizadorEvents } from "../pages/perfil_organizador.js";
import { eventViewDetailEvent, renderViewDetailEvent } from "../pages/detailViewEvent.js";

import { destiation_event, destination } from "../pages/destination_view.js";


export const routes = {
  "/": {
    render: home,
    events: homeEvents,
    guestOnly: true
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
    guestOnly: false
  },
  "/perfilorganizador": {
    render: perfilOrganizador,
    events: perfilOrganizadorEvents,
    guestOnly: false
  },
  "/perfilexplorador": {
    render: perfilExplorador,
    events: perfilExploradorEvents,
  //Se añadio ruta de detalle de eventos
  },
  "/detailEvent": {
    render: renderViewDetailEvent,
    events: eventViewDetailEvent,
    guestOnly: false
  }
};

