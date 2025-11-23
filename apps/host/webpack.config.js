const path = require("path");

const { getWebpackConfig } = require("@starships/webpack");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  name: "host",
  tsx: true,
  dir: __dirname,
  devPort: 3000,
  remotes: [
    moduleFederationConfig.api.name,
    moduleFederationConfig.hooks.name,
    moduleFederationConfig.utils.name,
    moduleFederationConfig.ui_components.name,
    moduleFederationConfig.styles.name,
  ],
  aliases: {
    "@": path.resolve(__dirname, "src"),
  },
});
