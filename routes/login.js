'use strict'

let express = require('express')
let debug = require('debug')('scrappy:login')
let accounts = require('../services/accounts')
let passport = require('passport')
let _ = require('underscore')

let router = express.Router();

router.get('/', (req, res) => {    
    res.render('login')
})

router.post('/', (req, res, next) => {
  
  let model = _.extend(req.body, {
      messages: []
  })
  
  if (res.locals.modelState.isValid)
    next()
  else    
    res.render('login', model)
    
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;