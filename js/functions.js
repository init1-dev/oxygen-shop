const TO_TOP_WAIT_MS = 200;
const MEDIA_QUERY = 1000;
const CONTACT_FORM_ID = 'contact__form';
const CUSTOM_CHECKBOX_ID = 'custom-checkbox';
const MODAL_LOCALSTORAGE_KEY = '__modal__Closed__';

export const CONTACT_FORM_NAME_ID = 'form-name';
export const CONTACT_FORM_EMAIL_ID = 'form-email';

export const returnToTop = () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, TO_TOP_WAIT_MS);
}

export const cambiarImagen = () => {
    const imagen = document.getElementById('pc-image');
    imagen.src = (window.innerWidth > MEDIA_QUERY)
        ? './assets/img/pcshape.png' 
        : './assets/img/pcshape2.png';
}

export const contactFormReset = () => {
    document.getElementById(CONTACT_FORM_NAME_ID).style.borderColor = '#95989A';
    document.getElementById(CONTACT_FORM_EMAIL_ID).style.borderColor = '#95989A';
    document.getElementById(CUSTOM_CHECKBOX_ID).style.borderColor = '#95989A';
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
        console.log("Respuesta: ", data);
        Swal.fire({
            icon: 'success',
            title: 'Thanks!',
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