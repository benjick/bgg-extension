import { alphaspel } from "./alphaspel.se";
import { spelexperten } from "./spelexperten.com";

export interface ConfigPart {
  /** Where to find each element containing the game info in the DOM */
  element: string;
  /** Where to find the game title. Relevant to `item` above. */
  title: string;
  /** This is where the BGG button will be inserted. Relevant to `item` above. */
  insertAfter: string;
  /** Possible to override default styles */
  boxStyle?: Partial<CSSStyleDeclaration>;
  className: string;
}

export interface Config {
  grid: ConfigPart;
  single: ConfigPart;
}

type Domain = string;

export const configs: Record<Domain, Config> = {
  "spelexperten.com": spelexperten,
  "alphaspel.se": alphaspel,
};
