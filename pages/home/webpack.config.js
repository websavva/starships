const { getWebpackConfig } = require('@starships/webpack/src/index.js');
const moduleFederationConfig = require('@starships/module-federation-config');

module.exports = getWebpackConfig({
  name: moduleFederationConfig.home_page.name,
  entry: './dev/index',
  tsx: true,
  devPort: moduleFederationConfig.home_page.devPort,
  dir: __dirname,
  remotes: [
    moduleFederationConfig.api.name,
    moduleFederationConfig.hooks.name,
    moduleFederationConfig.utils.name,
    moduleFederationConfig.ui_components.name,
    moduleFederationConfig.styles.name,
  ],
  exposes: {
    './index': './src/index',
  },
});
