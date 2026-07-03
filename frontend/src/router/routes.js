
import { home, homeEvents } from "../pages/home.js";
import { register, registerEvents } from "../pages/register.js";
import { login, loginEvents } from "../pages/login.js";
import { event,eventEvents} from "../pages/event.js";



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
  "/event": {
    render: event,
    events: eventEvents,
    guestOnly: false
  }
};

