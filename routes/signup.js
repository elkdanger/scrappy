'use strict'

let express = require('express')
let debug = require('debug')('scrappy:signup')

let router = express.Router()

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    
    if (res.locals.modelState.isValid) {
        debug('posting..')
        
        res.render('signup', req.body)
    }
    else
        res.render('signup', req.body)
    
})

module.exports = router