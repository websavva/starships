export interface WebpackConfigOptions {
  name: string;
  entry?: string;
  remotes?: string[];
  dir?: string;
  tsx?: boolean;
  disableDownloadingRemoteTypes?: boolean;
  devPort?: number;
  exposes?: Record<string, string>;
}

export function getWebpackConfig(
  options: WebpackConfigOptions
): typeof import("webpack").Configuration;
