
import { home, homeEvents } from "../pages/home.js";



export const routes = {
  "/": {
    render: home,
    events: homeEvents,
    guestOnly: true
  }
};

