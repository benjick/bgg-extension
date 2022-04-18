import { SearchResult, Game } from "../types/parsed";
import { Logger } from "./Logger";

export class BoardGameGeek {
  parser: DOMParser;
  baseUrl = "https://boardgamegeek.com/xmlapi2/";

  constructor() {
    this.parser = new DOMParser();
  }

  public async getGame2(game: string): Promise<Game | undefined> {
    const url = `http://localhost:3000/api?game=${game}`;
    const res = await fetch(url);
    if (res.status !== 200) {
      return undefined;
    }
    const json: Game = await res.json();
    return json;
  }

  private createSearchParams(name: string, exact: boolean) {
    const searchParams = new URLSearchParams({
      query: name.replace(/ /g, "+"),
      type: "boardgame",
      exact: Number(exact).toString(),
    });
    return searchParams.toString();
  }

  public async search(
    name: string,
    exact: boolean = true
  ): Promise<SearchResult | null> {
    const searchParams = this.createSearchParams(name, exact);
    const url = `${this.baseUrl}search?${searchParams}`;
    Logger.debug("Fetching", name, "from", url);
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(`BoardGameGeek.search failed. Status: ${res.status}`);
    }
    const xml = await res.text();
    const searchResult = this.parseSearchResultXml(xml);
    if (typeof searchResult === "undefined" && exact) {
      return this.search(name, false);
    }
    return searchResult ?? null;
  }

  private createGameParams(id: number) {
    const searchParams = new URLSearchParams({
      id: id.toString(),
      type: "boardgame",
      stats: "1",
    });
    return searchParams.toString();
  }

  public async getGame(item: SearchResult) {
    const searchParams = this.createGameParams(item.id);
    const url = `${this.baseUrl}thing?${searchParams}`;
    const res = await fetch(url);
    const xml = await res.text();
    return this.parseGameXml(item.id, xml);
  }

  private parseSearchResultXml(xml: string): SearchResult | undefined {
    const doc = this.parser.parseFromString(xml, "text/xml");
    const items = doc.getElementsByTagName("items")[0];
    const noItems = Number(items.getAttribute("total"));
    if (noItems === 0) {
      return undefined;
    }
    const item = items.getElementsByTagName("item")[0];
    return {
      id: Number(item.getAttribute("id")),
      name: item.getElementsByTagName("name")[0].getAttribute("value")!,
      yearpublished: Number(
        item.getElementsByTagName("yearpublished")[0]?.getAttribute("value")
      ),
    };
  }

  private parseGameXml(id: number, xml: string): Game | undefined {
    try {
      const doc = this.parser.parseFromString(xml, "text/xml");
      const ratings = doc
        .getElementsByTagName("items")[0]
        .getElementsByTagName("item")[0]
        .getElementsByTagName("statistics")[0]
        .getElementsByTagName("ratings")[0]
        .getElementsByTagName("average")[0];
      const average = Number(ratings.getAttribute("value"));
      return {
        id,
        name: "",
        average,
      };
    } catch (error) {
      return undefined;
    }
  }
}
