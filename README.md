# bgg-extension <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" height="20" /> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg" height="20" />

Adds BoardGameGeek rating to some webshops

> ❗ Matching games is far from perfect. Would probably need a better search engine than what BGG provides.

<details>
  <summary>Screenshots</summary>

![button](.github/screenshots/button.png)
![screenshot-1](.github/screenshots/screenshot-1.png)
![screenshot-2](.github/screenshots/screenshot-2.png)
![screenshot-3](.github/screenshots/screenshot-3.png)

</details>

## Support

Currently the following sites are supported:

- [alphaspel.se](https://alphaspel.se/search/?query=root)
- [spelexperten.com](https://www.spelexperten.com/cgi-bin/ibutik/AIR_ibutik.fcgi?funk=gor_sokning&AvanceradSokning=N&artnr=&varum=&artgrp=&Sprak_Suffix=SV&term=root)
- [tabletopfinder.eu](https://www.tabletopfinder.eu/en/category/board-game)
- [worldofboardgames.com](https://www.worldofboardgames.com/webshop-sok.php?searchString=root&search=S%F6k)

> ❗ Feel free to add more sites in `/src/config`.

## Installation

### Firefox 🚤

1. Go to https://github.com/benjick/bgg-extension/releases
2. Click on the `bgg_extension-XXX-an+fx.xpi` file
3. Click "Continue to Installation" in the popup followed by "Add"

### Chrome 🚣

1. Go to https://github.com/benjick/bgg-extension/releases
2. Download the `bgg-extension-XXX.zip` file and unpack it
3. Point your browser to `chrome://extensions/`
4. Check "Developer mode" in the top-right corner, then "Load unpacked" and nagivate to your unpacked folder

## Development

1. Install dependecies: `yarn`
2. Start file-watcher and launch firefox: `yarn dev`
3. You can also launch chrome/chromium with `yarn chromium`

> ❗ To be able to run chrome/chromium you probably will have to `cp .env.example .env` and adjust the `CHROME_PATH` variable.
