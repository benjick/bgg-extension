// test
import { BggSearchParams, getBggSearch, getBggThing } from "bgg-xml-api-client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SearchResult, Game } from "../src/types/parsed";
import { GameItem, SearchItem } from "../src/types/bgg-api";

const oneDay = 60 * 60 * 24;
const sevenDays = oneDay * 7;

function getBggSearchParams(game: string, exact: boolean): BggSearchParams {
  const params: BggSearchParams = {
    query: game,
    type: ["boardgame", "boardgameexpansion"],
  };
  if (exact) {
    params.exact = 1;
  }
  return params;
}

async function search(
  game: string,
  exact: boolean = true
): Promise<SearchResult | undefined> {
  const { data } = await getBggSearch(getBggSearchParams(game, exact));
  const total = Number(data.total);
  if (total === 0 && exact) {
    return search(game, false);
  }
  if (total === 0) {
    return undefined;
  }
  const item: SearchItem = Array.isArray(data.item) ? data.item[0] : data.item;
  return {
    id: Number(item.id),
    name: item.name.value,
    yearpublished: Number(item.yearpublished.value),
  };
}

async function getGame(searchResult: SearchResult): Promise<Game | undefined> {
  const { data } = await getBggThing({
    id: searchResult.id,
    type: ["boardgame", "boardgameexpansion"],
    stats: 1,
  });

  try {
    const item: GameItem = data.item;
    const average = Number(item.statistics.ratings.average.value);
    const name = Array.isArray(item.name)
      ? item.name.find((_name) => _name.type === "primary")!.value
      : item.name.value;
    return { average, id: Number(item.id), name };
  } catch (error) {
    undefined;
  }
}

export default async function (req: VercelRequest, res: VercelResponse) {
  let { game } = req.query;
  if (Array.isArray(game)) {
    game = game.join("/");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (!game) {
    res.status(404).send(`No game :(`);
    res.setHeader("Cache-Control", `public, s-maxage=${oneDay}`);
    return;
  }

  const searchResult = await search(game);
  if (searchResult) {
    const game = await getGame(searchResult);
    res.setHeader("Cache-Control", `public, s-maxage=${sevenDays}`);
    res.status(200).json(game);
    return;
  }
  res.setHeader("Cache-Control", `public, s-maxage=${oneDay}`);
  res.status(404).json(`No game :(`);
}
