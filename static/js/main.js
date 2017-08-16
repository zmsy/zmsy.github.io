/*
zmsy.co
Main javascript file - includes all logic for site
*/

// nav toggle function
function toggleNav() {
    console.log("Nav toggle clicked.");
    var nav = document.getElementById("nav-menu");
    var className = nav.getAttribute("class");
    if (className == "nav-right nav-menu") {
        nav.className = "nav-right nav-menu is-active";
    } else {
        nav.className = "nav-right nav-menu";
    }
}
document.getElementById("nav-toggle").addEventListener("click", toggleNav);
