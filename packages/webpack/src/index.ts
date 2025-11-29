import { resolve, join } from 'node:path';

import type { Configuration } from 'webpack';
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest';
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { FederatedTypesPlugin } from '@module-federation/typescript';
import { container, DefinePlugin } from 'webpack';
import moduleFederationConfig from '@starships/module-federation-config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';

import pkg from '../package.json';

import type { WebpackConfigOptions } from './types';

const { ModuleFederationPlugin } = container;

// Extract the constructor argument type (first parameter)
type ModuleFederationPluginOptions = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

export function getWebpackConfig(options: WebpackConfigOptions) {
  return async () => {
    const workspaceRootDir = (await findWorkspaceDir(process.cwd()))!;

    dotenv.config({
      path: resolve(workspaceRootDir, '.env'),
    });

    process.env.APP_BASE_URL ||= 'http://localhost:3000';
    process.env.STAGE = process.env.STAGE || 'production';

    const { catalog } = (await readWorkspaceManifest(workspaceRootDir))!;

    const getPackageVersion = (name: string) => {
      return (
        catalog![name] ||
        pkg.dependencies[name as keyof typeof pkg.dependencies] ||
        pkg.devDependencies[name as keyof typeof pkg.devDependencies]
      );
    };

    const isProduction = process.env.STAGE === 'production';
    const isDevelopment = process.env.STAGE === 'development';

    const mode = isProduction ? 'production' : 'development';

    const getRemoteUrl = (name: string) => {
      if (name === 'host') {
        return process.env.APP_BASE_URL!;
      }

      return !isDevelopment
        ? `${process.env.APP_BASE_URL}/__mf__/${name}`
        : `http://localhost:${moduleFederationConfig[name].devPort}`;
    };

    const currentFederationConfig = {
      name: options.name,
      filename: 'remoteEntry.js',
      exposes: options.exposes || {},
      remotes: Object.fromEntries(
        (options.remotes || []).map((name) => {
          const remoteUrl = getRemoteUrl(name);

          return [name, `${name}@${remoteUrl}/remoteEntry.js`];
        }),
      ),
      shared: options.tsx
        ? {
            react: {
              singleton: true,
              requiredVersion: getPackageVersion('react'),
            },
            'react-dom': {
              singleton: true,
              requiredVersion: getPackageVersion('react-dom'),
            },
            'styled-components': {
              singleton: true,
              requiredVersion: getPackageVersion('styled-components'),
            },
          }
        : undefined,
    } satisfies ModuleFederationPluginOptions;

    let { pathname: publicPath } = new URL(getRemoteUrl(options.name));

    if (publicPath === '/') {
      publicPath = 'auto';
    } else if (!publicPath.endsWith('/')) {
      publicPath += '/';
    }

    return {
      entry: options.entry || './src/index',
      mode,
      // devtool: isProduction ? false : "eval-source-map",
      devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers':
            'X-Requested-With, content-type, Authorization',
        },
        historyApiFallback: true,
        static: {
          directory: join(options.dir, 'dist'),
        },
        port: options.devPort,
      },
      output: {
        publicPath,
      },
      resolve: {
        extensions: ['.ts', options.tsx ? '.tsx' : null, '.js'].filter(Boolean),
        alias: options.aliases || {},
      },
      module: {
        rules: [
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: options.tsx ? /\.tsx?$/ : /\.ts$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              presets: [
                ...(options.tsx ? ['@babel/preset-react'] : []),
                '@babel/preset-typescript',
              ],
              // plugins: options.tsx ? ["babel-plugin-styled-components"] : [],
            },
          },
        ],
      },
      plugins: [
        new DefinePlugin({
          'process.env.APP_BASE_URL': JSON.stringify(process.env.APP_BASE_URL),
        }),
        options.publicDirs?.length
          ? new CopyWebpackPlugin({
              patterns: options.publicDirs,
            })
          : null,

        // Define federation config once and use for both plugins
        new ModuleFederationPlugin(currentFederationConfig),
        isProduction
          ? null
          : new FederatedTypesPlugin({
              federationConfig: currentFederationConfig,
            }),
        new HtmlWebpackPlugin({
          template:
            options.htmlTemplatePath || resolve(__dirname, '../index.html'),
        }),
      ].filter(Boolean),
    } as Configuration;
  };
}
