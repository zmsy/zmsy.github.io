/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

import { render } from "preact";

import { ColorPicker } from "./components";

// toggle the active menu on tap
document.getElementById("navbar-toggle").addEventListener("click", function () {
  Array.from(document.getElementsByClassName("navbar-menu")).map((x) =>
    x.classList.toggle("is-active")
  );
});

// set the default palette if it's not already
const darkModeButton = document.getElementById("dark-mode-button");
if (darkModeButton) {
  render(<ColorPicker />, darkModeButton);
}
