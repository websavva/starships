import type { Configuration } from "webpack";

export interface WebpackConfigOptions {
  name: string;
  entry?: string;
  remotes?: string[];
  dir?: string;
  tsx?: boolean;
  devPort?: number;
  exposes?: Record<string, string>;
  aliases?: Record<string, string>;
  htmlTemplatePath?: string;
  publicDirs?: string[];
}

export function getWebpackConfig(options: WebpackConfigOptions): Configuration;
