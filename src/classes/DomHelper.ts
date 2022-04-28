import { Config, ConfigPart, ConfigPartWithId } from "../config";
import { Game } from "../types/parsed";
import { StringHelper } from "./StringHelper";

const bggBaseUrl = "https://boardgamegeek.com/boardgame/";
const elementClassName = "bgg-extension-element";
const stylesheetId = "bgg-extension-stylesheet";

const baseStyles: Partial<CSSStyleDeclaration> = {
  alignItems: "center",
  appearance: "button",
  border: "1px solid black",
  borderRadius: "6px",
  backgroundColor: "#3F3A60",
  boxShadow:
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  boxSizing: "border-box",
  color: "white",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "18px",
  fontWeight: "500",
  lineHeight: "16px",
  margin: "0px auto 10px",
  maxWidth: "200px",
  width: "100%",
  padding: "8px 12px",
  textTransform: "none",
};

export class DomHelper {
  static cleanDom() {
    document
      .querySelectorAll(`.${elementClassName}`)
      .forEach((item) => item.remove());
    document.getElementById(stylesheetId)?.remove();
  }

  static createClass(config: ConfigPartWithId) {
    const styles = {
      ...baseStyles,
      ...(config.boxStyle ?? {}),
    };
    const classString = `
    .${elementClassName}-${config.id} {
      ${Object.entries(styles)
        .map(
          ([key, value]) => `${StringHelper.camelCaseToHyphen(key)}:${value};`
        )
        .join("\n")}
    }
    `;
    return classString;
  }

  static createStyleSheet(config: ConfigPartWithId[]) {
    const stylesheet = document.createElement("style");
    stylesheet.id = stylesheetId;
    stylesheet.innerHTML = `
    ${config.map((part) => this.createClass(part)).join("\n")}
    .${elementClassName}-text {
      margin: 4px 0 0 0;
    }
    .${elementClassName}-image {
      height: 34px;
    }
    `;
    document.querySelector("head")?.appendChild(stylesheet);
  }

  static createElement(game: Game, config: ConfigPartWithId, parent: Element) {
    // Button
    const button = document.createElement("a");
    button.href = `${bggBaseUrl}${game.id}`;
    button.target = "_blank";
    button.rel = "noreferrer";
    button.classList.add(elementClassName, `${elementClassName}-${config.id}`);
    button.onclick = (e) => {
      e.stopPropagation();
    };

    // Text
    const text = document.createElement("p");
    text.innerText = `${game.average.toFixed(1)}/10`;
    text.classList.add(`${elementClassName}-text`);

    // Image
    const image = document.createElement("img");
    image.classList.add(`${elementClassName}-image`);
    image.src =
      "https://cf.geekdo-static.com/images/logos/navbar-logo-bgg-b2.svg";

    button.append(image);
    button.append(text);
    parent.querySelector(config.insertAfter)?.after(button);
  }

  static mutationObserver(element: string, callback: (e: Element) => void) {
    const target = document.querySelector(element);
    if (!target) {
      return;
    }

    const observer = new MutationObserver((mutationsList, _observer) => {
      const addedNodes = mutationsList.flatMap((record) =>
        Array.from(record.addedNodes)
      );
      for (const node of addedNodes) {
        callback(node as Element);
      }
    });

    observer.observe(target, {
      childList: true,
    });
  }
}
