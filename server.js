import fs from "node:fs/promises";
import express from "express";
import cookieParser from "cookie-parser";
// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const JWT_SECRET = "your-secret-key";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();
app.use(cookieParser());

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.use("*", async (req, res) => {
  try {
    const authToken = req.cookies.authToken || "";
    const url =
      base === "/" ? req.originalUrl : req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }
    const rendered = await render(url, authToken);

    const fullhtml = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(
        `</body>`,
        `<script>
       window.__APOLLO_STATE__ = ${JSON.stringify(rendered?.state).replace(
         /</g,
         "\\u003c"
       )};
     </script></body>`
      );

    res.status(200).set({ "Content-Type": "text/html" }).send(fullhtml);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});
// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
