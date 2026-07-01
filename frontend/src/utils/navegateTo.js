import { router } from "./routes/router";

export function navigateTo(url) {
    history.pushState({}, "", url);
    router();
}