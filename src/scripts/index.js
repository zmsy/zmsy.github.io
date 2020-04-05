/*
zmsy.co
Main javascript file - includes all logic for site. Right now, this is a pretty
simplistic set of toggles for the site, but will be soon rebuilt to include the
newest React stack.
*/

// utility functions
function $(id) { return document.getElementById(id); }

// nav toggle function
function toggleNav() {
    document.getElementsByClassName("navbar-menu")[0].classList.toggle("is-active");
}

document.getElementById("navbar-toggle").addEventListener("click", toggleNav)
