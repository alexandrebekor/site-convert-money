const express = require('express')
const app = express()
const path = require('path')

// Require Lib
const money = require('./lib/money')
const apiBC = require('./lib/api-bc')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {
    const salePrice = await apiBC.getSalePrice()
    res.render('home', {
        salePrice
    })
})

app.get('/quotation', (req, res) => {
    const { price, amount } = req.query
    if (price && amount) {
        const result = money.convert(price, amount)
        res.render('quotation', {
            error: false,
            price: 'U$ ' + money.toMoney(price),
            amount: 'U$ ' + money.toMoney(amount),
            result: 'R$ ' + money.toMoney(result)
        })
    } else {
        res.render('quotation', {
            error: 'Valores Inválidos'
        })
    }
})

app.listen(3000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Project Online')
    }
})