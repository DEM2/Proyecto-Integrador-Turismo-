import { createElement } from "lucide";

export const renderIconSvg = (icon, attrs = {}) =>
  createElement(icon, attrs).outerHTML;
