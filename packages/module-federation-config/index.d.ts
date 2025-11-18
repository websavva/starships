export interface ModuleFederationConfigItem {
  name: string;
  devPort: number;
}

export const moduleFederationConfig: Record<string, ModuleFederationConfigItem>;

export default moduleFederationConfig;
