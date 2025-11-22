/**
 * @type {Record<string, typeof import('./index.d.ts').ModuleFederationConfigItem>}
 */
const config = {
  utils: {
    name: "utils",
    devPort: 3001,
  },

  styles: {
    name: "styles",
    devPort: 3002,
  },

  api: {
    name: "api",
    devPort: 3003,
  },

  ui_components: {
    name: "ui_components",
    devPort: 3004,
  },

  hooks: {
    name: "hooks",
    devPort: 3005,
  },

};

exports.moduleFederationConfig = config;

module.exports = config;
