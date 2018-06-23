/*
zmsy.co
Main javascript file - includes all logic for site
*/

// webpack imports
import './index.scss'

// utility functions
function $(id) { return document.getElementById(id); }

// nav toggle function
function toggleNav() {
    var nav = document.getElementsByClassName('navbar-menu')[0];
    nav.classList.toggle('is-active');
}


// fill in copyright year
function fillYearText() {
    $('yearText').textContent = new Date().getFullYear();
}

// invoke all of the good stuff
document.getElementById("navbar-toggle").addEventListener("click", toggleNav);
fillYearText();
