import { routes } from "./routes";

export function router() {
    const path = window.location.pathname;

    const Page = routes[path] || routes["*"];

    document.querySelector("#app").innerHTML = Page();
}