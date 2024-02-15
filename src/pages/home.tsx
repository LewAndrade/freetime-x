import { Dialog } from "../components/dialog";
import { Root } from "./root";

export const Home = () => (
  <Root title="Lew's Freetime">
    <>
      <button
        class="corner-button hamburger"
        onclick="window.dialog.showModal();"
      >
        ☰
      </button>

      <div id="activity">
        <h1>
          Hi, what will you <br /> <span class="pink">do</span> now?
        </h1>
      </div>

      <div hx-post="/actions" hx-trigger="load" hx-swap="outerHTML"></div>

      <button class="corner-button" form="selectedActions">
        Randomize
      </button>
      <Dialog />
    </>
  </Root>
);
