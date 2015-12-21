'use strict'

let express = require('express')
let router = express.Router();

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    
    // Check username and password
    
    res.render('login', req.body)
})

module.exports = router;