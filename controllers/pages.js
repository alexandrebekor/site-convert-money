const { trade, toCurrency } = require('../lib/convert')
const { apiBCQuotation } = require('../lib/apiBCQuotation')

const home = (req, res) => res.render('home')
const quotation = async (req, res) => {
    const { currency, currencyTrade } = req.query
    if (currency && currencyTrade) {
        const currencyConvert = trade(currency, currencyTrade)
        res.render('quotation', {
            currencyConverted: toCurrency(currencyConvert),
            currency: toCurrency(currency),
            currencyTrade: toCurrency(currencyTrade),
            current: await apiBCQuotation(),
            error: false
        })
    } else {
        res.render('home', {
            error: 'Valores Inválidos'
        })
    }
}

module.exports = {
    home,
    quotation
}