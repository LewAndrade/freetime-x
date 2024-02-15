import { Elysia } from "elysia";

export const staticPlugin = new Elysia()
  .get("/styles", () => Bun.file("public/styles.css"))
  .get("/htmx", () => Bun.file("public/htmx.min.js"))
  .get("/js", () => Bun.file("public/index.js"));
