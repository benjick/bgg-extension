import { configs } from "./src/config";
import pkg from "./package.json";
import { writeFileSync } from "fs";

type WebExtensionManifest = chrome.runtime.Manifest;

const manifest: WebExtensionManifest = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  manifest_version: 2,
  homepage_url: "https://github.com/benjick/bgg-extension",
  icons: {
    48: "icons/bgg-48.jpg",
  },
  permissions: ["webRequest", "https://bgg-extension.vercel.app/api"],
  content_scripts: [
    {
      matches: Object.keys(configs).map((domain) => `*://*.${domain}/*`),
      js: ["dist/bundle/bundle.js"],
    },
  ],
};

writeFileSync("./manifest.json", JSON.stringify(manifest, null, 2));
