import { Game } from "./BoardGameGeek";
import { Logger } from "./Logger";

// Bump this if the Game interface updates
const localStorageKey = "@bgg-extension/storage-v1";

interface CachedGame {
  game: Game | null;
  cachedAt: Date;
}

export class Storage {
  static getAll(): Record<string, CachedGame> {
    const stringified = window.localStorage.getItem(localStorageKey);
    if (!stringified) {
      return {};
    }
    try {
      const gamesRecord = JSON.parse(stringified) as Record<string, CachedGame>;
      return gamesRecord ?? {};
    } catch (error) {
      return {};
    }
  }

  static getGame(name: string): Game | null | undefined {
    const gamesDict = this.getAll();
    const cachedGame = gamesDict[name];
    return cachedGame?.game;
  }

  static setGame(name: string, game: Game | null): void {
    try {
      const gamesRecord = this.getAll();
      gamesRecord[name] = {
        game,
        cachedAt: new Date(),
      };
      const stringified = JSON.stringify(gamesRecord);
      window.localStorage.setItem(localStorageKey, stringified);
    } catch (error) {
      Logger.error("setGame error", error);
    }
  }
}
