import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const shouldUseBasePath = isGithubActions && !repositoryName.endsWith(".github.io");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: shouldUseBasePath ? `/${repositoryName}` : "",
  assetPrefix: shouldUseBasePath ? `/${repositoryName}/` : undefined,
};

export default nextConfig;
