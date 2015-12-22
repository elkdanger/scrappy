'use strict'

let db = require('./db')
let debug = require('debug')('scrappy:accounts')
let assert = require('assert')

module.exports = {
    
    /**
     * Finds an account given the email address
     * @param email The email address
     */
    findByEmail(email) {
        
      return db.open().then(context => {

          let acc = context.collection('accounts')
            .findOne({ email: email })
          
          return acc
      })  
        
    },
    
    /**
     * Creates an account with the specified email
     * @param email The email address
     */
    createAccount(email) {
        assert(email)
        
        return db.open().then(context => {            
            return context.insertOne({
                email: email,
                setupComplete: false
            })
        })
        
    }
    
}