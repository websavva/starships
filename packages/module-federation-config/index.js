/**
 * @type {Record<string, typeof import('./index.d.ts').ModuleFederationConfigItem>}
 */
const config = {
  ui_components: {
    name: "ui_components",
    devPort: 3002,
  },

  api: {
    name: "api",
    devPort: 3003,
  },
};

exports.moduleFederationConfig = config;

module.exports = config;