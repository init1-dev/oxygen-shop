import { returnToTop, ImageSwiper } from './functions.js';
import { currenciesListener, fetchCurrencies } from './currenciesFunctions.js';
import { contactForm } from './contactForm.js';
import { subscribeForm } from './subscribeForm.js';
import { TO_TOP_SCROLL_RANGE } from './globals.js';


console.log(ImageSwiper);

document.addEventListener("DOMContentLoaded", () => {
    fetchCurrencies();
    currenciesListener();
    contactForm();
    subscribeForm();
    
    const menuToggle = document.getElementById("header__menu-toggle");
    const menu = document.querySelector(".header__nav-list");

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function() {
            menuToggle.checked = false;
        });
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.closest(".header__nav") && menuToggle.checked) {
            menuToggle.checked = false;
        }
    });

    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY;
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let percentage = (scrollPosition / totalHeight) * 100;
        document.getElementById("percentageScroller").style.width = percentage + "%";
    });

    window.addEventListener('scroll', () => {
        let returnToTopButton = document.getElementById('returnToTopButton');
        returnToTopButton.style.display = (window.scrollY > TO_TOP_SCROLL_RANGE) ? 'block' : 'none';
    });

    const toTopButton = document.getElementById('returnToTopButton');

    toTopButton.addEventListener('click', returnToTop);
});