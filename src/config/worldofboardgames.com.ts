import { Config } from "./";

export const worldofboardgames: Config = {
  grid: {
    element: ".productContainer .product",
    title: ".medium a",
    insertAfter: ".medium",
    boxStyle: {
      color: "white !important",
    },
  },
  single: {
    element: '[itemtype="http://schema.org/Product"]',
    title: "[itemprop=name]",
    insertAfter: "[itemprop=aggregateRating]",
  },
};
