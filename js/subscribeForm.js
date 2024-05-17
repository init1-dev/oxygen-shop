import { FETCH_URL_STRING, MODAL_LOCALSTORAGE_KEY } from "./globals.js";
import { emailIsValid, modalStorageCheck, fetchUrl } from "./functions.js";

export const subscribeForm = () => {
    const subForm = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("emailInput");
    const modal = document.getElementById("subscribe");
    const closeButton = document.getElementById("closeBtn");

    subForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (emailIsValid(email)) {
            modal.classList.add("modal-hide");

            const formData = {
                'email': email
            }

            fetchUrl(FETCH_URL_STRING, formData, "Your subscription was sent successfully");
            
            localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
        } else {
            emailInput.classList.add("br-red");
        }
    });

    setTimeout(() => {
        modalStorageCheck(modal);
    }, 5000);

    window.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPosition = window.scrollY || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);

    if (scrollPosition / (scrollHeight - clientHeight) > 0.25) {
        modalStorageCheck(modal);
    }
    });

    closeButton.addEventListener("click", () => {
        modal.style.opacity = 0;
        modal.style.zIndex  = '-1';
        localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.opacity = 0;
            modal.style.zIndex  = '-1';
            localStorage.setItem(MODAL_LOCALSTORAGE_KEY, "true");
        }
    });
}