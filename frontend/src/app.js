import { router } from "./router/router.js";

export function initApp(){

    router();

    window.addEventListener("popstate", router);

}