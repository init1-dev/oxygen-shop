document.addEventListener("DOMContentLoaded", function() {
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

    function cambiarImagen() {
        const imagen = document.getElementById('pc-image');
        if (window.innerWidth > 1000) { // Cambiar el valor según la condición deseada
            imagen.src = './assets/img/pcshape.png';
        } else {
            imagen.src = './assets/img/pcshape2.png';
        }
    }

    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let percentage = (scrollPosition / totalHeight) * 100;
        document.getElementById("percentageScroller").style.width = percentage + "%";
    });

    window.addEventListener('resize', cambiarImagen);
    window.addEventListener('load', cambiarImagen);
});