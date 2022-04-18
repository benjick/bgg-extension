import { Config } from "./";

export const alphaspel: Config = {
  grid: {
    element: ".products .product",
    title: ".product-name",
    insertAfter: ".product-image-wrapper",
    className: "grid",
  },
  single: {
    element: ".main-product",
    title: "h3",
    insertAfter: ".main-product-right .row",
    boxStyle: {
      marginTop: "10px",
    },
    className: "single",
  },
};
