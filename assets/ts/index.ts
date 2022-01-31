/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

// import * as lib from "./lib";
import { defaultPaletteLight, setPaletteCSS } from "./components";

// toggle the active menu on tap
document.getElementById("navbar-toggle").addEventListener("click", function () {
  Array.from(document.getElementsByClassName("navbar-menu")).map((x) =>
    x.classList.toggle("is-active")
  );
});

// set the default palette if it's not already
setPaletteCSS(defaultPaletteLight);
