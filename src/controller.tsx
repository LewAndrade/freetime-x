import { Client, isFullDatabase, isFullPage } from "@notionhq/client";
import {
  GetDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { WithAuth } from "./types";
import { Activity } from "./types";

export const notion = new Client({});

export const fetchDatabase = async (apiKey: string, databaseId: string) => {
  return await notion.databases.retrieve({
    database_id: databaseId,
    auth: apiKey,
  });
};

export const getFreetimeActions = (database: GetDatabaseResponse) => {
  if (isFullDatabase(database)) {
    const actions = database.properties["Action"];
    if (actions.type == "select") {
      return actions.select.options.map((a) => a.name);
    }
  }
  return [];
};

export const getActivity = async (
  apiKey: string,
  databaseId: string,
  actions: string[]
): Promise<Activity[]> => {
  const baseFilter = { property: "Done", checkbox: { equals: false } };

  const query: WithAuth<QueryDatabaseParameters> = {
    auth: apiKey,
    database_id: databaseId,
    filter: baseFilter,
  };

  if (actions.length > 0) {
    query.filter = {
      and: [
        baseFilter,
        {
          or: actions.map((a) => ({
            property: "Action",
            select: { equals: a },
          })),
        },
      ],
    };
  }

  const response = (await notion.databases.query(query)).results;

  const activities = response
    .map((a) => {
      if (!isFullPage(a)) return null;
      const name = a.properties["Name"];
      const action = a.properties["Action"];
      if (!(name.type == "title" && action.type == "select")) return null;
      if (!action.select) return null;
      return {
        id: a.id,
        name: name.title[0].plain_text,
        action: action.select?.name,
      };
    })
    .filter((c) => c != null) as Activity[];

  return activities;
};
