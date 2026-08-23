const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const webDir = path.join(distDir, "web");

const packageJsonPath = path.join(rootDir, "package.json");

if (!fs.existsSync(packageJsonPath)) {
  throw new Error(`package.json was not found: ${packageJsonPath}`);
}

const packageJson = JSON.parse(
  fs.readFileSync(packageJsonPath, "utf8")
);

const buildVersion =
  process.env.VERSION || packageJson.version || "1.0.0";

const releaseTag =
  process.env.RELEASE_TAG || "local-build";

const commitSha =
  process.env.GITHUB_SHA || "local";

const buildTime =
  new Date().toISOString();

/*
 * dist is generated on every build.
 * It does not need to exist in Git.
 */
fs.rmSync(distDir, {
  recursive: true,
  force: true
});

fs.mkdirSync(webDir, {
  recursive: true
});

const buildMetadata = {
  application: packageJson.name,
  version: buildVersion,
  releaseTag,
  commitSha,
  generatedAt: buildTime
};

const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >
  <title>ShipFast Node</title>
</head>
<body>
  <main>
    <h1>ShipFast Node</h1>
    <p>Build ${buildVersion}</p>
    <p>Release ${releaseTag}</p>
    <p>Commit ${commitSha.substring(0, 7)}</p>
  </main>
</body>
</html>`;

const healthContent = {
  status: "ok",
  application: packageJson.name,
  version: buildVersion
};

fs.writeFileSync(
  path.join(webDir, "index.html"),
  indexHtml,
  "utf8"
);

fs.writeFileSync(
  path.join(webDir, "version.json"),
  JSON.stringify(buildMetadata, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(webDir, "health.json"),
  JSON.stringify(healthContent, null, 2),
  "utf8"
);

const requiredFiles = [
  "index.html",
  "version.json",
  "health.json"
];

for (const fileName of requiredFiles) {
  const filePath = path.join(webDir, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Required build output is missing: ${filePath}`
    );
  }
}

console.log(`Build created successfully: ${webDir}`);

for (const fileName of fs.readdirSync(webDir)) {
  const filePath = path.join(webDir, fileName);
  const fileStats = fs.statSync(filePath);

  console.log(
    `- ${fileName} (${fileStats.size} bytes)`
  );
}
