import { resolve } from "path";
import { cp } from "fs/promises";
import { exec } from "child_process";

import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { config } from "dotenv";
import moduleFederationConfig from "@starships/module-federation-config";

config();

async function buildPackage(path: string) {
  await new Promise((resolve, reject) =>
    exec(
      `pnpm run build`,
      {
        cwd: path,
      },
      (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err || stderr);
        } else {
          resolve(stdout);
        }
      }
    )
  );
}

async function build() {
  const workspaceDir = await findWorkspaceDir(process.cwd());

  const workspacePackages = await findWorkspacePackages(workspaceDir!);

  const getPackagePathByMfName = (mfName: string) => {
    return workspacePackages.find(({ manifest }) => {
      const [_, potentialMfName] = manifest.name!.split("/") ?? [];

      return potentialMfName === mfName;
    })!.rootDirRealPath;
  };

  const remoteMfPackages = [
    ...Object.values(moduleFederationConfig).map(({ name }) => name),
  ].map((name) => ({
    name,
    path: getPackagePathByMfName(name),
  }));

  debugger;

  for (const { name, path } of remoteMfPackages) {
    await buildPackage(path);
    debugger;
  }

  const hostPackagePath = getPackagePathByMfName("host");

  await buildPackage(hostPackagePath);

  // copying remote packages to host dist
  const hostRemotePackagesDir = resolve(hostPackagePath, "dist", "__mf__");

  for (const { name, path } of remoteMfPackages) {
    const remotePackageDistPath = resolve(path, "dist");

    const hostRemotePackagePath = resolve(hostRemotePackagesDir, name);

    await cp(remotePackageDistPath, hostRemotePackagePath, {
      recursive: true,
    });
  }
}

build();
