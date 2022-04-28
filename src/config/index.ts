import { alphaspel } from "./alphaspel.se";
import { spelexperten } from "./spelexperten.com";
import { tabletopfinder } from "./tabletopfinder.eu";
import { worldofboardgames } from "./worldofboardgames.com";

export interface ConfigPart {
  /** If the page uses infinite scroll */
  observer?: string;
  /** Where to find each element containing the game info in the DOM */
  element: string;
  /** Where to find the game title. Relevant to `item` above. */
  title: string;
  /** This is where the BGG button will be inserted. Relevant to `item` above. */
  insertAfter: string;
  /** Possible to override default styles */
  boxStyle?: Partial<CSSStyleDeclaration>;
}

export interface ConfigPartWithId extends ConfigPart {
  id: string;
}

export type Config = Record<string, ConfigPart>;

type Domain = string;

export const configs: Record<Domain, Config> = {
  "spelexperten.com": spelexperten,
  "alphaspel.se": alphaspel,
  "worldofboardgames.com": worldofboardgames,
  "tabletopfinder.eu": tabletopfinder,
};

export function getConfig(domain: string): ConfigPartWithId[] | undefined {
  domain = domain.replace("www.", "");
  const config = configs[domain];
  if (config) {
    return Object.entries(config).map(([id, configPart]) => ({
      ...configPart,
      id,
    }));
  }
}
