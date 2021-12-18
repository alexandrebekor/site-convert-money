const { getQuotation, getListCurrency } = require('../lib/apiBC')
const { trade, toCurrency } = require('../lib/convert')

const home = async (req, res) => {
    const { list } = await getListCurrency()
    const listInitial = list.map(item => {
        const [coin] = Object.keys(item).map(coin => {
            const name = item[coin][0].name
            const code = item[coin][0].code
            return {
                name,
                code
            }
        })
        return coin
    })

    const {
        fromCoinValue,
        toCoinValue,
        fromCoinCode,
        toCoinCode
    } = req.query

    const fromValue = fromCoinValue ?? 1
    const fromCode = fromCoinCode ?? "BRL"
    const toCode = toCoinCode ?? "USD"
    const selectCoin = listInitial

    res.render('home', {
        fromCoinValue: fromValue,
        fromCoinCode: fromCode,
        quotation: await getQuotation(fromCode, toCode),
        selectCoin
    })
}

const quotation = async (req, res) => {
    const { currency, currencyTrade } = req.query

    if (currency && currencyTrade) {
        const currencyConvert = trade(currency, currencyTrade)
        res.render('quotation', {
            currencyConverted: toCurrency(currencyConvert),
            currency: toCurrency(currency),
            currencyTrade: toCurrency(currencyTrade),
            error: false
        })
    } else {
        res.render('home', {
            error: 'Valores Inválidos',
            quotation: await getQuotation()
        })
    }
}

module.exports = {
    home,
    quotation
}