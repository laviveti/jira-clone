import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => c.json({ hello: "world" }));

app.get("/project/:projectId", (c) => {
  const projectId = c.req.param("projectId");
  return c.json({ project: projectId });
});

export const GET = handle(app);
