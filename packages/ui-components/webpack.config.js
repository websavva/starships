const { getWebpackConfig } = require("@starships/webpack");
const moduleFederationConfig = require("@starships/module-federation-config");

module.exports = getWebpackConfig({
  entry: "./dev/bootstrap.tsx",
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
    "./Logo": "./src/Logo",
    "./OuterSpaceBackground": "./src/OuterSpaceBackground",
    "./Card": "./src/Card",
    "./StarshipItem": "./src/StarshipItem",
    "./styles/mq": "./src/styles/mq",
  },
});
