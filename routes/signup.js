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
        
        accounts.findByEmail(req.body.email)
            .then(account => {
                
                if (!account)
                    accounts.createAccount(req.body.email, req.body.password)
                        .then(() => {
                            res.redirect('/')
                        })
                else {
                    res.locals.modelState.addModelError('email', 'This email address has already been taken')
                    res.render('signup', req.body)
                }                
            })
    }
    else
        res.render('signup', req.body)
    
})

module.exports = router