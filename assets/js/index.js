/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

// nav toggle function
function toggleNav() {
    document.getElementsByClassName("navbar-menu")[0].classList.toggle("is-active");
}

document.getElementById("navbar-toggle").addEventListener("click", toggleNav)
