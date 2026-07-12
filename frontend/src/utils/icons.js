import { createElement } from "lucide";

export const iconSVG = (icon, attrs = {}) =>
    createElement(icon, attrs).outerHTML;