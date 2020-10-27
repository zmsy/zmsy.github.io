/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

document.getElementById("navbar-toggle").addEventListener("click", function () {
  document
    .getElementsByClassName("navbar-menu")[0]
    .classList.toggle("is-active");
});
