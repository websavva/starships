/**
 * @type {Record<string, typeof import('./index.d.ts').ModuleFederationConfigItem>}
 */
const config = {
  utils: {
    name: "utils",
    devPort: 3001,
  },

  api: {
    name: "api",
    devPort: 3002,
  },

  styles: {
    name: "styles",
    devPort: 3003,
  },

  hooks: {
    name: "hooks",
    devPort: 3004,
  },

  ui_components: {
    name: "ui_components",
    devPort: 3005,
  },

  home_page: {
    name: "home_page",
    devPort: 3006,
  },

  ship_page: {
    name: "ship_page",
    devPort: 3007,
  }
};

exports.moduleFederationConfig = config;

module.exports = config;
