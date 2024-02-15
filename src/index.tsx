import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Home } from "./pages/home";
import { Client } from "@notionhq/client";
import { staticPlugin } from "./plugins/static";
import { activityPlugin } from "./plugins/activity";

const app = new Elysia()
  .use(html())
  // .get("/", () => <Home />)
  .get("/*", () => <Home/>)
  .use(activityPlugin)
  .use(staticPlugin)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
