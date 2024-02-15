import { Elysia, t } from "elysia";
import { fetchDatabase, getActivity, getFreetimeActions } from "../controller";
import { Activity } from "../types";
import { ActivityText } from "../components/activityText";
import { html } from "@elysiajs/html";
import { Actions } from "../components/selectedActions";

let savedActivities: Activity[] | null = null;

const getRandomActivity = (activities: Activity[]) =>
  activities[Math.floor(Math.random() * activities.length)];

export const activityPlugin = new Elysia()
  .use(html())
  .post("/actions", async ({ cookie }) => {
    const apiKey = cookie.apiKey.get();
    const databaseId = cookie.databaseId.get();
    const database = await fetchDatabase(apiKey, databaseId);
    const actions = getFreetimeActions(database);
    return <Actions actions={actions} />;
  })
  .post(
    "/query",
    async ({ body, cookie, query }) => {
      const changed = Boolean(query.changed);

      let activity: Activity;

      if (savedActivities && !changed) {
        activity = getRandomActivity(savedActivities);
      } else {
        const apiKey = cookie.apiKey.get();
        const databaseId = cookie.databaseId.get();

        let actions = body.actions ?? [];
        actions = actions instanceof Array ? actions : [actions];

        const activities = await getActivity(apiKey, databaseId, actions);
        activity = getRandomActivity(activities);
        savedActivities = activities;
      }
      return <ActivityText activity={activity}/>
    },
    {
      body: t.Object({
        actions: t.Optional(t.Union([t.Array(t.String()), t.String()])),
      }),
      query: t.Object({ changed: t.Optional(t.BooleanString()) }),
    }
  );
