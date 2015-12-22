'use strict'

let express = require('express')
let debug = require('debug')('scrappy:login')
let accounts = require('../services/accounts')
let _ = require('underscore')

let router = express.Router();

router.get('/', (req, res) => {  
    res.render('login')
})

router.post('/', (req, res) => {
    
    var model = _.extend(req.body, {
        messages: [],
        modelState: req.modelState
    })
           
    if (req.modelState.isValid) {
        // Check username and password
        accounts.findByEmail(req.body.email)
            .then(account => {
                
                if (!account)
                    model.messages.push('Your account was not found')          
                
                res.render('login', model)
            })
    }
    else
        res.render('login', model)
})

module.exports = router;