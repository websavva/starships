import type { Configuration } from "webpack";

export interface WebpackConfigOptions {
  name: string;
  entry?: string;
  remotes?: string[];
  dir?: string;
  tsx?: boolean;
  disableDownloadingRemoteTypes?: boolean;
  devPort?: number;
  exposes?: Record<string, string>;
  aliases?: Record<string, string>;
}

export function getWebpackConfig(options: WebpackConfigOptions): Configuration;
