require("dotenv").config();

/** @type {import('./src/types/web-ext-config').WebExtConfig} */
const config = {
  verbose: false,
  ignoreFiles: ["browser-profiles", "dist/js", "dist/artifacts"],
  artifactsDir: "dist/artifacts",
  build: {
    overwriteDest: false, // TODO: Check if CI
  },
  run: {
    profileCreateIfMissing: true,
    firefoxProfile: "./browser-profiles/firefox",
    keepProfileChanges: true,
    watchFile: ["dist/bundle/bundle.js"],
    browserConsole: true,
    startUrl: [
      "https://www.spelexperten.com/sallskapsspel/strategispel/root.html",
      "https://alphaspel.se/search/?query=root",
    ],
  },
  lint: {
    selfHosted: true,
  },
  sign: {
    apiKey: process.env.AMO_JWT_ISSUER,
    apiSecret: process.env.AMO_JWT_SECRET,
  },
};

module.exports = config;
