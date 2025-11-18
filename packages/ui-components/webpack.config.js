const { getWebpackConfig } = require("@starships/webpack");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  name: moduleFederationConfig.ui_components.name,
  tsx: true,
  dir: __dirname,
  devPort: moduleFederationConfig.ui_components.devPort,
  remotes: [
    moduleFederationConfig.api.name,
    moduleFederationConfig.styles.name,
  ],
  exposes: {
    "./Button": "./src/Button",
    "./GlobalStyle": "./src/GlobalStyle",
  },
});
