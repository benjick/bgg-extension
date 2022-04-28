import { BoardGameGeek } from "./classes/BoardGameGeek";
import { ConfigPartWithId, getConfig } from "./config";
import { DomHelper } from "./classes/DomHelper";
import { Logger } from "./classes/Logger";
import { StringHelper } from "./classes/StringHelper";

class BggExtension {
  private async handleElement(
    element: Element | null,
    config: ConfigPartWithId
  ) {
    if (element) {
      const titleElement = element.querySelector(config.title);
      if (titleElement?.textContent) {
        const name = StringHelper.sanitizeName(titleElement.textContent);
        const game = await BoardGameGeek.getGame(name);
        if (game) {
          DomHelper.createElement(game, config, element);
        }
      } else {
        Logger.error("Could not find title element", element, config.title);
      }
    }
  }

  public tests() {
    Logger.info("⚠️ Running tests!");
    const test = ["Root"];
    test.forEach(async (name) => {
      const game = await BoardGameGeek.getGame(name);
      Logger.info("✅ Test results are in", name, game);
    });
  }

  public main() {
    const config = getConfig(document.location.host);
    if (!config) {
      Logger.info(
        `Could not find a configuration for ${document.location.host} 🤔`
      );
      return;
    }
    try {
      DomHelper.cleanDom();
      DomHelper.createStyleSheet(config);
      for (const part of config) {
        const elements = document.querySelectorAll(part.element);
        elements.forEach(async (element) => {
          this.handleElement(element, part);
        });
        if (part.observer) {
          DomHelper.mutationObserver(part.observer, (element) => {
            this.handleElement(element, part);
          });
        }
      }
    } catch (error) {
      Logger.error("main", error);
    }
    Logger.info(
      "Loaded the bgg-extension. See https://github.com/benjick/bgg-extension for more info!"
    );
  }
}

const app = new BggExtension();
app.main();
