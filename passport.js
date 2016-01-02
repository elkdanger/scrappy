'use strict'

let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let debug = require('debug')('passport')
let accounts = require('./services/accounts')

passport.serializeUser((user, done) => {    
    done(null, {
        id: user._id,
        username: user.email,
        fullName: 'Example User'
    })    
})

passport.deserializeUser((user, done) => {    
    done(null, user)
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
}, (email, password, done) => {       
    
    accounts.findByEmail(email).then(account => {
        
        if (!account) {
            done(null, false, { message: 'Wrong email address and/or password' })
            return
        }
        
        done(null, account)
                
    })    
}))