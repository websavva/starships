const { getWebpackConfig } = require('@starships/webpack/src/index.js');
const moduleFederationConfig = require('@starships/module-federation-config');

module.exports = getWebpackConfig({
  entry: './dev/index.ts',
  name: moduleFederationConfig.ui_components.name,
  tsx: true,
  dir: __dirname,
  devPort: moduleFederationConfig.ui_components.devPort,
  remotes: [
    moduleFederationConfig.api.name,
    moduleFederationConfig.styles.name,
  ],
  exposes: {
    './styles/mq': './src/styles/mq',
    './GlobalStyle': './src/GlobalStyle',
    './Logo': './src/Logo',
    './OuterSpaceBackground': './src/OuterSpaceBackground',
    './Card': './src/Card',
    './StarshipItem': './src/StarshipItem',
    './Spinner': './src/Spinner',
    './Pagination': './src/Pagination',
    './MessageBox': './src/MessageBox',
    './ErrorAlert': './src/ErrorAlert',
    './Accordion': './src/Accordion',
  },
});
