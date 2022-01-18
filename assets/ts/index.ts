/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

// toggle the active menu on tap
document.getElementById("navbar-toggle").addEventListener("click", function () {
  Array.from(document.getElementsByClassName("navbar-menu")).map((x) =>
    x.classList.toggle("is-active")
  );
});
