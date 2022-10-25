import { Config } from "./";

export const webhallen: Config = {
  grid: {
    observer: ".product-list-page",
    element: ".product-grid-item",
    title: ".product-list-item-title",
    insertAfter: ".panel-top",
  },
  single: {
    element: ".product-header",
    title: "h1",
    insertAfter: ".text-secondary",
  },
};
