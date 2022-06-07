/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

import { render } from "preact";

import { Modal } from "./components";
import { baseStore } from "./store";

// toggle the active menu on tap
document.getElementById("navbar-toggle").addEventListener("click", function () {
  const { setNavOpen } = baseStore.getState();
  setNavOpen(true);
});

// instantiate the modal
const navModal = document.getElementById("nav-modal");
if (navModal) {
  render(<Modal id="nav-modal" />, navModal);
}

document.addEventListener("load", (e) => {
  console.log(`Document loaded: ${e.timeStamp}`);
});
