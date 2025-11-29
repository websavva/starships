const { getWebpackConfig } = require('@starships/webpack/src/index.js');
const moduleFederationConfig = require('@starships/module-federation-config');

module.exports = getWebpackConfig({
  name: moduleFederationConfig.styles.name,
  tsx: false,
  dir: __dirname,
  devPort: moduleFederationConfig.styles.devPort,
  exposes: {
    './colors': './src/colors',
    './breakpoints': './src/breakpoints',
    './fonts': './src/fonts',
    './utils/create-color': './src/utils/create-color',
  },
});
