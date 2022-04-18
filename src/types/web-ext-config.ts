interface WebExtGlobals {
  /** Web extension source directory. Default `./` */
  sourceDir: string;
  /** Directory where artifacts will be saved. Default `./web-ext-artifacts` */
  artifactsDir: string;
  /** Show verbose output */
  verbose: boolean;
  /** A list of glob patterns to define which files should be ignored. (Example: `ignoreFiles: ["path/to/first.js", "path/to/second.js", "**\/*.log"]`) */
  ignoreFiles: string[];
  /** Disable all features that require standard input */
  noInput: boolean;
}

interface WebExtRun extends WebExtGlobals {
  /** The extensions runners to enable. Specify this option multiple times to run against multiple targets. */
  target: Array<"firefox-desktop" | "firefox-android" | "chromium">;
  /** Path or alias to a Firefox executable such as firefox-bin or firefox.exe. If not specified, the default Firefox will be used. You can specify the
following aliases in lieu of a path: firefox, beta, nightly, firefoxdeveloperedition. */
  firefoxBinary: string;
  /** Run Firefox using a copy of this profile. The profile can be specified as a directory or a name, such as one you would see in the Profile Manager. If not
specified, a new temporary profile will be created. */
  firefoxProfile: string;
  /** Path or alias to a Chromium executable such as google-chrome, google-chrome.exe or opera.exe etc. If not specified, the default Google Chrome will be
used. */
  chromiumBinary: string;
  /** Path to a custom Chromium profile */
  chromiumProfile: string;
  /** Create the profile directory if it does not already exist */
  profileCreateIfMissing: boolean;
  /** Run Firefox directly in custom profile. Any changes to the profile will be saved. */
  keepProfileChanges: boolean;
  /** Reload the extension only when the contents of this file changes. This is useful if you use a custom build process for your extension */
  watchFile: string[];
  /** Paths and globs patterns that should not be watched for changes. This is useful if you want to explicitly prevent web-ext from watching part of the extension directory tree, e.g. the node_modules folder. */
  watchIgnored: string[];
  /** Launch firefox with a custom preference (example: `pref: ["general.useragent.locale=fr-FR"]`. */
  pref: string[];
  /** Launch firefox at specified page */
  startUrl: string[];
  /** Open the DevTools Browser Console. */
  browserConsole: boolean;
}

interface WebExtLint extends WebExtGlobals {
  /** The type of output to generate. default: text */
  output: "json" | "text";
  /** Output only metadata as JSON. default: false */
  metadata: boolean;
  /** Treat warnings as errors by exiting non-zero for warnings. default: false */
  warningsAsErrors: boolean;
  /** Prettify JSON output. default: false */
  pretty: boolean;
  /** Your extension will be self-hosted. This disables messages related to hosting on addons.mozilla.org. default: false */
  selfHosted: boolean;
  /** Disables colorful shell output. default: false */
  boring: boolean;
}

interface WebExtSign extends Partial<WebExtGlobals> {
  /** API key (JWT issuer) from addons.mozilla.org */
  apiKey: string;
  /** API secret (JWT secret) from addons.mozilla.org */
  apiSecret: string;
  /** Signing API URL prefix. default: https://addons.mozilla.org/api/v4 */
  apiUrlPrefix?: string;
  /** A custom ID for the extension. This has no effect if the extension already declares an explicit ID in its manifest. */
  id?: string;
  /** Number of milliseconds to wait before giving up. */
  timeout?: number;
  /** The channel for which to sign the addon. Either 'listed' or 'unlisted' */
  channel?: "listed" | "unlisted";
}

export interface WebExtConfig extends Partial<WebExtGlobals> {
  run: Partial<WebExtRun>;
  lint: Partial<WebExtLint>;
  sign: WebExtSign;
}
