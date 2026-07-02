
import { home, homeEvents } from "../pages/home.js";
import { register, registerEvents } from "../pages/register.js";



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
  }
};

