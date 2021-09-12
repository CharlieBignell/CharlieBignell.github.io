const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const divider = document.querySelector("#divider");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    console.log("toggle")
    hamburger.classList.toggle("activeHam");
    navMenu.classList.toggle("activeHam");
    divider.classList.toggle("activeHam");

}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("activeHam");
    navMenu.classList.remove("activeHam");
    divider.classList.remove("activeHam");
}