export const Actions = ({actions}: {actions: string[]}) => (
  <form id="selectedActions" hx-post="/query" hx-target="#activity">
    {actions?.map((a) => (
      <div class="action">
        <label class="switch" for={a + "Action"}>
          <input
            type="checkbox"
            id={a + "Action"}
            name="actions"
            value={a}
            hx-post="/query?changed=true"
            hx-trigger="change"
          />
          <span class="slider round"></span>
        </label>
        <p>{a}</p>
      </div>
    ))}
  </form>
);
