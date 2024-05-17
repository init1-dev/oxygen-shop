import { CONTACT_FORM_ID, CONTACT_FORM_NAME_ID, CONTACT_FORM_EMAIL_ID, CONTACT_FORM_CHECKBOX_ID, CUSTOM_CHECKBOX_ID, FETCH_URL_STRING } from './globals.js';
import { contactFormReset, fetchUrl } from './functions.js';

export const contactForm = () => {
    const contactForm = document.getElementById(CONTACT_FORM_ID);
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const NAME_VALUE = document.getElementById(CONTACT_FORM_NAME_ID).value.trim();
        const EMAIL_VALUE = document.getElementById(CONTACT_FORM_EMAIL_ID).value.trim();
        const IS_CHECKED = document.getElementById(CONTACT_FORM_CHECKBOX_ID).checked;
    
        let nameOk = false;
        let emailOk = false;
        let isChecked = false;
    
        let nameInput = document.getElementById(CONTACT_FORM_NAME_ID);
        if (NAME_VALUE.length < 2 || NAME_VALUE.length > 100) {
            nameInput.style.borderColor = 'red';
            nameOk = false;
        } else {
            nameInput.style.borderColor = '#20cd17';
            nameOk = true;
        }
    
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailInput = document.getElementById(CONTACT_FORM_EMAIL_ID);
        if (!emailRegex.test(EMAIL_VALUE)) {
            emailInput.style.borderColor = 'red';
            emailOk = false;
        } else {
            emailInput.style.borderColor = '#20cd17';
            emailOk = true;
        }
    
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
    
            const formData = {
                'name': nombre,
                'email': email
            }
    
            fetchUrl(FETCH_URL_STRING, formData, "Form submitted successfully");
    
        }
    });
}