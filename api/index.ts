import type { VercelRequest, VercelResponse } from "@vercel/node";
import { BggClient } from "boardgamegeekclient";
import { SearchResult, Game } from "../src/types/parsed";

const client = BggClient.Create();

const oneDay = 60 * 60 * 24;
const sevenDays = oneDay * 7;

async function search(
  game: string,
  exact: boolean = true
): Promise<SearchResult | undefined> {
  const result = await client.search.query({
    type: ["boardgame", "boardgameexpansion"],
    query: game,
    exact: exact ? 1 : undefined,
  });
  const total = result[0].total;
  if (total === 0 && exact) {
    return search(game, false);
  }
  if (total === 0) {
    return undefined;
  }
  const item = result[0].items[0];
  return {
    id: Number(item.id),
    name: item.name,
    yearpublished: item.yearpublished,
  };
}

async function getGame(searchResult: SearchResult): Promise<Game | undefined> {
  const result = await client.thing.query({
    id: searchResult.id,
    type: ["boardgame", "boardgameexpansion"],
    stats: 1,
  });

  try {
    const item = result[0];
    const average = item.statistics.ratings.average;
    const name = item.name;
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
  game = game.replace(" - ", " ").replace("+-+", "+");

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
  res.status(404).json({
    error: "No game :(",
  });
}
