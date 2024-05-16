export let currencies = {};

export const fetchCurrencies = () => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
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