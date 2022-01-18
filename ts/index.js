(() => {
  // <stdin>
  document.getElementById("navbar-toggle").addEventListener("click", function() {
    Array.from(document.getElementsByClassName("navbar-menu")).map((x) => x.classList.toggle("is-active"));
  });
})();
