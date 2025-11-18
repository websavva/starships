const { getWebpackConfig } = require("@starships/configs");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  name: moduleFederationConfig.api.name,
  tsx: false,
  dir: __dirname,
  devPort: moduleFederationConfig.api.devPort,
  exposes: {
    "./index": "./src/index",
  }
});