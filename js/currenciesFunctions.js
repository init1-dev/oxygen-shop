import { DEFAULT_CURRENCY } from "./globals.js";

export let currencies = {};

export const currenciesListener = () => {
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
}

export const fetchCurrencies = () => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
    .then((response) => {
        if(response.ok && response.status === 200){
            return response.json()
        } else {
            throw new Error("Error in API call");
        }
    })
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