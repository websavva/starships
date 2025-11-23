const path = require("path");

const { getWebpackConfig } = require("@starships/webpack");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  name: moduleFederationConfig.utils.name,
  tsx: false,
  dir: __dirname,
  devPort: moduleFederationConfig.utils.devPort,
  exposes: {
    "./debounce": "./src/debounce",
    "./search-params": "./src/search-params",
    "./upper-first": "./src/upper-first",
    "./sleep": "./src/sleep",
  },
});
