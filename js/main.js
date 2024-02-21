// CONFIG
const MEDIA_QUERY = 1000;
const TO_TOP_SCROLL_RANGE = 500;
const TO_TOP_WAIT_MS = 200;
const MSG_TIMEOUT = 3000;
// CONTACT FORM
const CONTACT_FORM_ID = 'contact__form';
const CONTACT_FORM_NAME_ID = 'form-name';
const CONTACT_FORM_EMAIL_ID = 'form-email';
const CONTACT_FORM_CHECKBOX_ID = 'form__checkbox';
const CUSTOM_CHECKBOX_ID = 'custom-checkbox';
const MSG_ID = 'form__submit-msg';
const FETCH_URL_STRING = 'https://jsonplaceholder.typicode.com/users';
// MODAL CFG
const MODAL_LOCALSTORAGE_KEY = '__modal__Closed__';
// CURRENCIES (usd, eur or gbp)
const DEFAULT_CURRENCY = 'usd';

let currencies = {};

// FUNCIONES
const returnToTop = () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, TO_TOP_WAIT_MS);
}

const cambiarImagen = () => {
    const imagen = document.getElementById('pc-image');
    imagen.src = (window.innerWidth > MEDIA_QUERY)
        ? './assets/img/pcshape.png' 
        : './assets/img/pcshape2.png';
}

const contactFormReset = () => {
    document.getElementById(CONTACT_FORM_NAME_ID).style.borderColor = '#95989A';
    document.getElementById(CONTACT_FORM_EMAIL_ID).style.borderColor = '#95989A';
    document.getElementById(CUSTOM_CHECKBOX_ID).style.borderColor = '#95989A';
    document.getElementById(CONTACT_FORM_ID).reset();
}

const successMsg = () => {
    const msgSpan = document.getElementById(MSG_ID)
    msgSpan.style.opacity = 1;
      setTimeout(function() {
        msgSpan.style.opacity = 0;
      }, MSG_TIMEOUT);
}

const modalStorageCheck = (modal) => {
    if (!localStorage.getItem(MODAL_LOCALSTORAGE_KEY) || localStorage.getItem(MODAL_LOCALSTORAGE_KEY) === 'false') {
        modal.style.opacity = 1;
        modal.style.zIndex  = '999';
    }
}

const fetchUrl = (url, formData) => {
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
      })
      .catch((err) => {
        console.error("Error al enviar los datos: ", err);
      });
}

const fetchCurrencies = () => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${DEFAULT_CURRENCY}.json`)
    .then((response) => response.json())
    .then((data) => {
        currencies = {
            usd: {
                basic: '$10',
                pro: '$25',
                premium: '$60'
            },
            eur: {
                basic: `${parseFloat(10 * data.usd.eur).toFixed(2)}€`,
                pro: `${parseFloat(25 * data.usd.eur).toFixed(2)}€`,
                premium: `${parseFloat(60 * data.usd.eur).toFixed(2)}€`
            },
            gbp: {
                basic: `${parseFloat(10 * data.usd.gbp).toFixed(2)}£`,
                pro: `${parseFloat(25 * data.usd.gbp).toFixed(2)}£`,
                premium: `${parseFloat(60 * data.usd.gbp).toFixed(2)}£`
            }
        }
        console.log(currencies);
    })
    .catch((error) => {
        console.error("Error al obtener los tipos de cambio:", error);
    });
}

// LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    fetchCurrencies();
    
    // CONTROL DEL MENU MOVIL
    const menuToggle = document.getElementById("header__menu-toggle");
    const menu = document.querySelector(".header__nav-list");

    // OCULTAR MENU MOVIL CUANDO SE HACE CLICK EN UN ENLACE
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function() {
            menuToggle.checked = false;
        });
    });

    // OCULTAR MENU MOVIL CUANDO SE HACE CLICK FUERA DEL MENU
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.closest(".header__nav") && menuToggle.checked) {
            menuToggle.checked = false;
        }
    });

    // PERCENTAGE SCROLL
    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY;
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let percentage = (scrollPosition / totalHeight) * 100;
        document.getElementById("percentageScroller").style.width = percentage + "%";
    });

    // BOTON TO TOP
    window.addEventListener('scroll', () => {
        let returnToTopButton = document.getElementById('returnToTopButton');
        returnToTopButton.style.display = (window.scrollY > TO_TOP_SCROLL_RANGE) ? 'block' : 'none';
    });

    const toTopButton = document.getElementById('returnToTopButton');

    toTopButton.addEventListener('click', returnToTop);

    // CAMBIO DE IMAGEN
    window.addEventListener('resize', cambiarImagen);
    window.addEventListener('load', cambiarImagen);

    // VALIDACION DEL FORMULARIO
    document.getElementById(CONTACT_FORM_ID).addEventListener('submit', (event) => {
        event.preventDefault();
    
        const NAME_VALUE = document.getElementById(CONTACT_FORM_NAME_ID).value.trim();
        const EMAIL_VALUE = document.getElementById(CONTACT_FORM_EMAIL_ID).value.trim();
        const IS_CHECKED = document.getElementById(CONTACT_FORM_CHECKBOX_ID).checked;

        let nameOk = false;
        let emailOk = false;
        let isChecked = false;
    
        // Validamos nombre
        let nameInput = document.getElementById(CONTACT_FORM_NAME_ID);
        if (NAME_VALUE.length < 2 || NAME_VALUE.length > 100) {
            nameInput.style.borderColor = 'red';
            nameOk = false;
        } else {
            nameInput.style.borderColor = '#20cd17';
            nameOk = true;
        }
    
        // Validamos email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailInput = document.getElementById(CONTACT_FORM_EMAIL_ID);
        if (!emailRegex.test(EMAIL_VALUE)) {
            emailInput.style.borderColor = 'red';
            emailOk = false;
        } else {
            emailInput.style.borderColor = '#20cd17';
            emailOk = true;
        }

        // Validamos checkbox
        let checkbox = document.getElementById(CUSTOM_CHECKBOX_ID);
        if (!IS_CHECKED) {
            checkbox.style.borderColor = 'red';
            isChecked = false;
        } else {
            checkbox.style.borderColor = '#20cd17';
            isChecked = true;
        }

        if(nameOk && emailOk && isChecked) {
            let nombre = document.getElementById(CONTACT_FORM_NAME_ID).value;
            let email = document.getElementById(CONTACT_FORM_EMAIL_ID).value;

            contactFormReset();
            successMsg();

            const formData = {
                'name': nombre,
                'email': email
            }

            fetchUrl(FETCH_URL_STRING, formData);

        }
    });

    // SUBSCRIBE MODAL
    const modal = document.getElementById("subscribe");
    const closeButton = document.getElementById("closeBtn");
    const form = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("emailInput");

    // AL CARGAR LA PAGINA ESPERA 5 SEGUNDOS, SI EL MODAL NO SE HA CERRADO PREVIAMENTE, LO ABRE
    setTimeout(() => {
        modalStorageCheck(modal);
    }, 5000);

    // COMPRUEBA EL SCROLL PARA LANZAR EL MODAL, ACTUALMENTE 25%
    window.addEventListener("scroll", () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = window.scrollY || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);

      if (scrollPosition / (scrollHeight - clientHeight) > 0.25) {
        modalStorageCheck(modal);
      }
    });

    // Cerrar el modal al hacer clic en el botón "X"
    closeButton.addEventListener("click", () => {
      modal.style.opacity = 0;
      modal.style.zIndex  = '-1';
      localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.opacity = 0;
        modal.style.zIndex  = '-1';
        localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
      }
    });

    // Cerrar el modal al presionar la tecla ESC
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        modal.style.opacity = 0;
        modal.style.zIndex  = '-1';
        localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
      }
    });

    // ENVIO DEL FORMULARIO
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = emailInput.value.trim();

      if (emailIsValid(email)) {        
        modal.style.opacity = 0;
        modal.style.zIndex  = '-1';

        const formData = {
            'email': email
        }

        fetchUrl(FETCH_URL_STRING, formData)
        
        localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
      }
    });

    // Función para validar el formato del email
    function emailIsValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // PRICE CHANGER
    const currencySelector = document.getElementById("currency-selector");

    for (let i = 0; i < currencySelector.options.length; i++) {
      if (currencySelector.options[i].value === DEFAULT_CURRENCY) {
        currencySelector.options[i].selected = true;
        break;
      } else {
          currencySelector.options[1].selected = true;
      }
    }

    currencySelector.addEventListener("change", function () {
        const selectedCurrency = this.value;

        const basicPrice = document.querySelector(".item-price-red");
        const proPrice = document.querySelector(".item-price-blue");
        const premiumPrice = document.querySelector(".item-price-green");

        switch (selectedCurrency) {
            case "usd":
                basicPrice.textContent = currencies.usd.basic;
                proPrice.textContent = currencies.usd.pro;
                premiumPrice.textContent = currencies.usd.premium;
            break;
            case "eur":
                basicPrice.textContent = currencies.eur.basic;
                proPrice.textContent = currencies.eur.pro;
                premiumPrice.textContent = currencies.eur.premium;
            break;
            case "gbp":
                basicPrice.textContent = currencies.gbp.basic;
                proPrice.textContent = currencies.gbp.pro;
                premiumPrice.textContent = currencies.gbp.premium;
            break;
        }
    });

});