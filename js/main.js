function returnToTop() {
    // Espera 200 milisegundos antes de volver al principio de la página con una animación suave
    setTimeout(function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
}

function cambiarImagen() {
    const imagen = document.getElementById('pc-image');
    if (window.innerWidth > 1000) { // Cambiar el valor según la condición deseada
        imagen.src = './assets/img/pcshape.png';
    } else {
        imagen.src = './assets/img/pcshape2.png';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    // CONTROL DEL MENU MOVIL
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

    // PERCENTAGE SCROLL

    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let percentage = (scrollPosition / totalHeight) * 100;
        document.getElementById("percentageScroller").style.width = percentage + "%";
    });

    // BOTON TO TOP
    window.addEventListener('scroll', function() {
        let returnToTopButton = document.getElementById('returnToTopButton');
        if (window.scrollY > 300) {
            returnToTopButton.style.display = 'block';
        } else {
            returnToTopButton.style.display = 'none';
        }
    });

    const toTopButton = document.getElementById('returnToTopButton');

    toTopButton.addEventListener('click', function() {
        returnToTop();
    });

    window.addEventListener('resize', cambiarImagen);
    window.addEventListener('load', cambiarImagen);
});