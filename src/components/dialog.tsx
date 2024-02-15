export const Dialog = () => (
  <dialog id="dialog">
    <h2>
      Hi, thanks for using <span class="purple">Freetime</span>
      <span class="pink">X</span>
    </h2>
    <form id="secrets" onsubmit="return false;">
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          placeholder="Integration Secret"
          name="apiKey"
          id="apiKey"
        />
        <label for="apiKey" class="form__label">
          Integration Secret
        </label>
      </div>
      <div class="form__group field">
        <input
          type="input"
          name="databaseId"
          class="form__field"
          placeholder="The Database ID here"
          id="databaseId"
        />
        <label for="databaseId" class="form__label">
          Database ID
        </label>
      </div>
      <button
        onclick="putCookie(document.getElementById('secrets'));"
        value="set secrets"
        class="corner-button inner"
      >
        set secrets
      </button>
    </form>
    <p>
      For this to work you need to provide the ID of the database and the notion
      Integration API Secret.
    </p>
    <p>
      Don't worry your Integration Secret Key is safe, it's stored on you
      browser only.
    </p>
    <p>
      Create an integration{" "}
      <a href="https://www.notion.so/my-integrations">here</a>.
    </p>
    <p>*The integration needs to have access to the database.</p>

    <button onclick="window.dialog.close();" aria-label="close" class="x">
      ❌
    </button>
  </dialog>
);
