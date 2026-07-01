import { router } from "./router/router";

export function navigateTo(url) {
    history.pushState({}, "", url);
    router();
}