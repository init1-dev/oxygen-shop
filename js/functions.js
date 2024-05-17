import { TO_TOP_WAIT_MS, CONTACT_FORM_ID, MODAL_LOCALSTORAGE_KEY } from "./globals.js";

const Swal = window.swal;
const Swiper = window.Swiper;

export const returnToTop = () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, TO_TOP_WAIT_MS);
}

export const contactFormReset = () => {
    const inputs = document.querySelectorAll("#contact__form input");
    inputs.forEach(input => {
        console.log(input.classList.contains("br-ok"));
        input.classList.contains("br-ok")
            ? input.classList.add("br-reset")
            : input.classList.add("br-check-reset")
    })
    document.getElementById(CONTACT_FORM_ID).reset();
}

export const modalStorageCheck = (modal) => {
    if (!localStorage.getItem(MODAL_LOCALSTORAGE_KEY) || localStorage.getItem(MODAL_LOCALSTORAGE_KEY) === 'false') {
        modal.style.opacity = 1;
        modal.style.zIndex  = '999';
    }
}

export const fetchUrl = (url, formData, message) => {
    fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    })
    .then((resp) => resp.json())
    .then((data) => {
        Swal.fire({
            icon: 'success',
            title: `¡Thanks${data.name ? " " + data.name : ""}!`,
            text: message,
            confirmButtonText: 'Close'
        })
    })
    .catch((err) => {
        console.error("Error al enviar los datos: ", err);
    });
}

export const ImageSwiper = new Swiper(".images-swiper", {
    grabCursor: true,
    slidesPerView: 1,
    initialSlide: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1000: {
            slidesPerView: 1,
            centeredSlides: true
        }
    }
});

export function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}