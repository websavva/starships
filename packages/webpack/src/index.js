const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const { container } = require("webpack");
const { ModuleFederationPlugin } = container;
const path = require("path");
const moduleFederationConfig = require("@starships/module-federation-config");

const dotenv = require("dotenv");

dotenv.config();

const pkg = require("../package.json");

exports.getWebpackConfig = (options) => {
  const isProduction = process.env.NODE_ENV === "production";

  const currentFederationConfig = {
    name: options.name,
    filename: "remoteEntry.js",
    exposes: options.exposes || {},
    remotes: Object.fromEntries(
      (options.remotes || []).map((name) => {
        const remoteUrl = isProduction
          ? `${process.env.BASE_URL}/${name}/remoteEntry.js`
          : `http://localhost:${moduleFederationConfig[name].devPort}/remoteEntry.js`;
        return [name, `${name}@${remoteUrl}`];
      })
    ),
    shared: options.tsx
      ? [
          {
            react: {
              singleton: true,
              requiredVersion: pkg.dependencies.react,
            },
          },
          {
            "react-dom": {
              singleton: true,
              requiredVersion: pkg.dependencies["react-dom"],
            },
          },
        ]
      : [],
  };

  return {
    entry: options.entry || "./src/index",
    mode: process.env.NODE_ENV || "production",

    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      static: {
        directory: path.join(options.dir, "dist"),
      },
      port: options.devPort,
    },
    output: {
      publicPath: "auto",
    },
    resolve: {
      extensions: [".ts", options.tsx ? ".tsx" : null, ".js"].filter(Boolean),
      alias: options.aliases || {},
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: options.tsx ? /\.tsx?$/ : /\.ts$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: [
              ...(options.tsx ? ["@babel/preset-react"] : []),
              "@babel/preset-typescript",
            ],
            // plugins: options.tsx ? ["babel-plugin-styled-components"] : [],
          },
        },
      ],
    },
    plugins: [
      // Define federation config once and use for both plugins
      new ModuleFederationPlugin(currentFederationConfig),
      new FederatedTypesPlugin({
        disableDownloadingRemoteTypes:
          options.disableDownloadingRemoteTypes || false,
        federationConfig: currentFederationConfig,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
      }),
    ],
  };
};
