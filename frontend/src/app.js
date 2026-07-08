import { router } from "./router/router";

export function initApp(){

    router();

    window.addEventListener("popstate", router);

}