/*
zmsy.co
Main javascript file - includes all logic for site
*/

// nav toggle function
function toggleNav() {
    console.log("Nav toggle clicked.");
    var nav = document.getElementById("navbar-menu");
    nav.classList.toggle('is-active');
}


// fill in copyright year
function fillYearText() {
    var yearText = document.getElementById('yearText');
    yearText.textContent = new Date().getFullYear(); 
}

// invoke all of the good stuff
document.getElementById("navbar-toggle").addEventListener("click", toggleNav);
fillYearText();

