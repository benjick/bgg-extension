import { Game } from "../types/parsed";
import { Logger } from "./Logger";

export class BoardGameGeek {
  static baseUrl = "https://bgg-extension.vercel.app/api/";

  public static async getGame(game: string): Promise<Game | undefined> {
    const url = `${this.baseUrl}?game=${game.replace(/ /g, "+")}`;
    const res = await fetch(url);
    if (res.status !== 200) {
      Logger.debug("❌ No hit for", game, url);
      return undefined;
    }
    const json: Game = await res.json();
    return json;
  }
}
