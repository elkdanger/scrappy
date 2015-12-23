'use strict'

let express = require('express')
let debug = require('debug')('scrappy:signup')
let accounts = require('../services/accounts')

let router = express.Router()

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    
    if (res.locals.modelState.isValid) {
        
        accounts.createAccount(req.body.email, req.body.password)
            .then(() => {
                res.redirect('/')
            })
    }
    else
        res.render('signup', req.body)
    
})

module.exports = router