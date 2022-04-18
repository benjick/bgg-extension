export interface SearchResult {
  id: number;
  type?: string;
  name: string;
  yearpublished: number;
}

export interface Game {
  id: number;
  average: number;
}

export class BoardGameGeek {
  parser: DOMParser;
  baseUrl = "https://boardgamegeek.com/xmlapi2/";

  constructor() {
    this.parser = new DOMParser();
  }

  public async search(
    name: string,
    exact: boolean = true
  ): Promise<SearchResult | null> {
    const formattedName = name.replace(/ /g, "+");
    const url = `${
      this.baseUrl
    }search?query=${formattedName}&type=boardgame,boardgameaccessory,boardgameexpansion&exact=${Number(
      exact
    )}`;
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

  public async getGame(item: SearchResult) {
    const url = `${this.baseUrl}thing?id=${item.id}&type=boardgame,boardgameaccessory,boardgameexpansion&stats=1`;
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
      type: item.getAttribute("type") ?? undefined,
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
        average,
      };
    } catch (error) {
      return undefined;
    }
  }
}
