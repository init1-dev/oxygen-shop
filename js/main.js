const menuToggle = document.getElementById("header__menu-toggle");
const menu = document.querySelector(".header__nav-list");

// Ocultar el menú móvil cuando se hace clic en un enlace
menu.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        menuToggle.checked = false;
    });
});

// Ocultar el menú móvil cuando se hace clic fuera del menú
document.addEventListener("click", function(event) {
    const target = event.target;
    if (!target.closest(".header__nav") && menuToggle.checked) {
        menuToggle.checked = false;
    }
});