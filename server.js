const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const pathname = request.url === "/" ? "/index.html" : request.url;
  const filePath = path.resolve(publicDir, `.${pathname}`);

  if (!filePath.startsWith(`${publicDir}${path.sep}`)) {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(body);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(error);
    }
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`DANAGO Pay is running at http://${host}:${port}`);
});
