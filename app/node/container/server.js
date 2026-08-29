const http = require("http");

const port = process.env.PORT || 3000;
const version = process.env.APP_VERSION || "local";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(
    JSON.stringify({
      application: "node-oci-demo",
      version,
      status: "running"
    })
  );
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Node OCI demo is running on port ${port}`);
});
