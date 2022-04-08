/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

import { render } from "preact";

import { ColorPicker, NavModal } from "./components";
import { store } from "./store";

console.log("zustand store loading...");
const { setState } = store;
console.log("zustand store loaded!");

// toggle the active menu on tap
document.getElementById("navbar-toggle").addEventListener("click", function () {
  console.log("Setting modal open!");
  setState({
    navOpen: false,
  });
});

// set the default palette if it's not already
// const darkModeButton = document.getElementById("dark-mode-button");
// render(<ColorPicker />, darkModeButton);

const navModalRoot = document.getElementById("nav-modal-root");
render(<NavModal />, navModalRoot);
