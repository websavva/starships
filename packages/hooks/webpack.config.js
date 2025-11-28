const { getWebpackConfig } = require("@starships/webpack");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  entry: "./src/index.ts",
  name: moduleFederationConfig.hooks.name,
  remotes: [
    moduleFederationConfig.api.name,
  ],
  tsx: true,
  dir: __dirname,
  devPort: moduleFederationConfig.hooks.devPort,
  exposes: {
    "./use-api": "./src/use-api",
  },
});
