import { join, resolve } from "node:path";
import { createServer, type Server } from "node:http";

import { cp, rm, mkdir } from "fs/promises";
import { $ } from "execa";
import staticHandler from "serve-handler";

import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { config } from "dotenv";
import moduleFederationConfig from "@starships/module-federation-config";

class BuildCommand {
  /**
   * Initialize workspace directories and packages
   */
  private static async getWorkspaceConfig(): Promise<{
    workspaceDir: string;
    workspacePackages: Awaited<ReturnType<typeof findWorkspacePackages>>;
  }> {
    console.log("🔍 Initializing workspace...");
    const workspaceDir = (await findWorkspaceDir(process.cwd()))!;
    const workspacePackages = await findWorkspacePackages(workspaceDir!);
    console.log(`✅ Workspace found at: ${workspaceDir}`);
    console.log(`📦 Found ${workspacePackages.length} workspace packages`);

    return { workspaceDir, workspacePackages };
  }

  /**
   * Get package path by module federation name
   */
  private static getPackagePathByMfName(
    mfName: string,
    workspacePackages: Awaited<ReturnType<typeof findWorkspacePackages>>
  ): string {
    return workspacePackages.find(({ manifest }) => {
      const [_, potentialMfName] = manifest.name!.split("/") ?? [];
      return potentialMfName === mfName;
    })!.rootDirRealPath;
  }

  /**
   * Initialize remote module federation packages
   */
  private static getRemotePackages(
    workspacePackages: Awaited<ReturnType<typeof findWorkspacePackages>>
  ): Array<{ name: string; path: string }> {
    return [
      ...Object.values(moduleFederationConfig).map(({ name }) => name),
    ].map((name) => ({
      name,
      path: this.getPackagePathByMfName(name, workspacePackages),
    }));
  }

  /**
   * Build a single package
   */
  private static async buildPackage(path: string, packageName?: string): Promise<void> {
    const displayName = packageName || path.split("/").pop() || "package";
    console.log(`🔨 Building ${displayName}...`);
    await $({
      cwd: path,
    })`pnpm run build`;
    console.log(`✅ Built ${displayName}`);
  }

  /**
   * Build the host package
   */
  private static async buildHostPackage(
    workspacePackages: Awaited<ReturnType<typeof findWorkspacePackages>>
  ): Promise<string> {
    const hostPackagePath = this.getPackagePathByMfName(
      "host",
      workspacePackages
    );
    await this.buildPackage(hostPackagePath, "host");
    return hostPackagePath;
  }

  /**
   * Prepare the app dist directory (remove if exists, then create)
   */
  private static async prepareDistDirectory(
    workspaceDir: string
  ): Promise<string> {
    const appDistDir = join(workspaceDir, "dist");
    console.log(`📁 Preparing dist directory: ${appDistDir}`);

    await rm(appDistDir, {
      recursive: true,
    }).catch((error) => {
      if (error.code !== "ENOENT") {
        throw error;
      }
      console.log("  ℹ️  Dist directory not found, will create...");
    });

    await mkdir(appDistDir, {
      recursive: true,
    });
    console.log(`✅ Dist directory ready`);

    return appDistDir;
  }

  /**
   * Copy remote module federation packages to app dist directory
   */
  private static async copyRemotePackageToDist(
    appDistDir: string,
    remotePackageName: string,
    remotePackagePath: string
  ): Promise<void> {
    console.log(`📦 Copying ${remotePackageName} to dist...`);
    const appRemotePackagesDistDir = join(appDistDir, "__mf__");

    const remotePackageDistPath = resolve(remotePackagePath, "dist");
    const hostRemotePackagePath = resolve(
      appRemotePackagesDistDir,
      remotePackageName
    );

    await cp(remotePackageDistPath, hostRemotePackagePath, {
      recursive: true,
    });
    console.log(`✅ Copied ${remotePackageName}`);
  }

  /**
   * Copy host package to app dist directory
   */
  private static async copyHostPackageToDist(
    hostPackagePath: string,
    appDistDir: string
  ): Promise<void> {
    console.log(`📦 Copying host package to dist...`);
    await cp(join(hostPackagePath, "dist"), appDistDir, {
      recursive: true,
    });
    console.log(`✅ Copied host package`);
  }

  /**
   * Main build method that orchestrates the entire build process
   */
  static async run(stage: string): Promise<void> {
    console.log(`\n🚀 Starting build process (stage: ${stage})\n`);

    // Initialize workspace
    const { workspaceDir, workspacePackages } = await this.getWorkspaceConfig();

    console.log(`🔧 Loading environment variables...`);
    config({
      path: resolve(workspaceDir, ".env"),
    });

    // Initialize remote packages
    const remoteMfPackages = this.getRemotePackages(workspacePackages);
    console.log(`📋 Found ${remoteMfPackages.length} remote packages to build\n`);

    // Prepare dist directory
    const appDistDir = await this.prepareDistDirectory(workspaceDir);

    const isPrepare = stage === "prepare";

    let server: Server | null = null;

    if (isPrepare) {
      console.log(`🌐 Starting development server...`);
      server = createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return staticHandler(request, response, {
          public: appDistDir,
          directoryListing: false,
        });
      });

      await new Promise<void>((resolve, reject) => {
        server!.on("error", (error) => {
          console.error(`❌ Server error:`, error);
          reject(error);
        });

        setTimeout(() => {
          reject(new Error("Server timeout"));
        }, 30e3);

        const { hostname, port } = new URL(process.env.APP_BASE_URL!);
        const serverPort = +port || 3000;
        const serverHostname = hostname || "localhost";

        server!.listen(serverPort, serverHostname, () => {
          console.log(`✅ Server running at http://${serverHostname}:${serverPort}\n`);
          resolve();
        });
      });
    }

    console.log(`🏗️  Building remote packages:\n`);
    for (const { path, name } of remoteMfPackages) {
      await this.buildPackage(path, name);
      await this.copyRemotePackageToDist(appDistDir, name, path);
    }

    console.log(`\n🏗️  Building host package:\n`);
    // Build host package
    const hostPackagePath = await this.buildHostPackage(workspacePackages);

    // Copy host package to dist
    await this.copyHostPackageToDist(hostPackagePath, appDistDir);

    if (server) {
      console.log(`\n🛑 Shutting down server...`);
      await new Promise<void>((resolve, reject) => {
        server!.close((err) => {
          if (err) {
            console.error(`❌ Error closing server:`, err);
            reject(err);
          } else {
            console.log(`✅ Server closed`);
            resolve();
          }
        });
      });

      server = null;
    }

    console.log(`\n✨ Build completed successfully!\n`);
  }
}

// Execute build
const stageIndex = process.argv.findIndex((arg) => arg === "--stage");
const stage = stageIndex !== -1 ? process.argv[stageIndex + 1] : "production";

process.env.STAGE = stage;
process.env.NODE_END = stage === "production" ? "production" : "development";

BuildCommand.run(stage);
