const path = require("path");

const { getWebpackConfig } = require("@starships/webpack");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  name: moduleFederationConfig.api.name,
  tsx: false,
  dir: __dirname,
  devPort: moduleFederationConfig.api.devPort,
  exposes: {
    "./index": "./src/index",
  },
  aliases: {
    axios: path.join(
      __dirname,
      "node_modules",
      "axios",
      "dist",
      "browser",
      "axios.cjs"
    ),
    // "axios-extensions": path.join(
    //   __dirname,
    //   "node_modules",
    //   "axios-extensions",
    //   "dist",
    //   "axios-extensions.js"
    // ),
  },
});
