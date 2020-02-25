/*
zmsy.co
Main javascript file - includes all logic for site
*/

// utility functions
function $(id) { return document.getElementById(id); }

// nav toggle function
function toggleNav() {
    document.getElementsByClassName("navbar-menu")[0].classList.toggle("is-active");
}

document.getElementById("navbar-toggle").addEventListener("click", toggleNav)
