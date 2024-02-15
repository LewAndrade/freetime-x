import { Activity } from "../types";

export const ActivityText = ({ activity }: { activity: Activity }) => (
  <h1>
    Now it's time to <span class="purple">{activity.action}</span>. <br />
    <span class="pink">{activity.name}</span>.
  </h1>
);
