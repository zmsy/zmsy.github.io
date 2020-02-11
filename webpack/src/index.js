/*
zmsy.co
Main javascript file - includes all logic for site
*/

// utility functions
function $(id) { return document.getElementById(id); }

// nav toggle function
function toggleNav() {
    var nav = document.getElementsByClassName('navbar-menu')[0];
    nav.classList.toggle('is-active');
}
