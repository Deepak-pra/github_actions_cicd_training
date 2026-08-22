const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const webDir = path.join(distDir, "web");

const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, "package.json"), "utf8")
);

const buildVersion = process.env.VERSION || packageJson.version;
const releaseTag = process.env.RELEASE_TAG || "local-build";
const commitSha = process.env.GITHUB_SHA || "local";
const buildTime = new Date().toISOString();

/*
 * The dist directory is generated during every build.
 * It is intentionally not committed to Git.
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
    <p>Commit ${commitSha.substring(0, 7)}</p>
  </main>
</body>
</html>`;

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
  JSON.stringify(
    {
      status: "ok",
      application: packageJson.name
    },
    null,
    2
  ),
  "utf8"
);

const requiredFiles = [
  "index.html",
  "version.json",
  "health.json"
];

for (const file of requiredFiles) {
  const filePath = path.join(webDir, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Build output is missing: ${filePath}`);
  }
}

console.log(`Build created at ${webDir}`);

for (const file of fs.readdirSync(webDir)) {
  console.log(`- ${file}`);
}
