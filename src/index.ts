import { BoardGameGeek, Game } from "./classes/BoardGameGeek";
import { ConfigPart, configs } from "./config";
import { DomHelper } from "./classes/DomHelper";
import { Logger } from "./classes/Logger";
import { Storage } from "./classes/Storage";
import { StringHelper } from "./classes/StringHelper";

class BggExtension {
  bgg: BoardGameGeek;

  constructor() {
    this.bgg = new BoardGameGeek();
  }

  private async getGame(name: string, useCache = true): Promise<Game | null> {
    let game: Game | null | undefined;
    try {
      if (useCache) {
        game = Storage.getGame(name);
      }
      if (typeof game !== "undefined") {
        Logger.debug("✅ cache hit", name);
        return game;
      }
      Logger.debug("🔴 cache miss", name);

      const searchResult = await this.bgg.search(name);
      if (searchResult) {
        game = await this.bgg.getGame(searchResult);
      }

      Storage.setGame(name, game ?? null);
      return game ?? null;
    } catch (error) {
      return null;
    }
  }

  private async handleElement(element: Element | null, config: ConfigPart) {
    if (element) {
      const titleElement = element.querySelector(config.title);
      if (titleElement?.textContent) {
        const name = StringHelper.sanitizeName(titleElement.textContent);
        const game = await this.getGame(name);
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
      const game = await this.getGame(name, false);
      Logger.info("✅ Test results are in", name, game);
    });
  }

  public main() {
    const config = configs[document.location.host.replace("www.", "")];
    if (!config) {
      Logger.info(
        `Could not find a configuration for ${document.location.host} 🤔`
      );
      return;
    }
    try {
      DomHelper.cleanDom();
      DomHelper.createStyleSheet(config);
      const elements = document.querySelectorAll(config.grid.element);
      elements.forEach(async (element) => {
        this.handleElement(element, config.grid);
      });
      const element = document.querySelector(config.single.element);
      this.handleElement(element, config.single);
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
