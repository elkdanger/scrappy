'use strict'

let db = require('./db')
let debug = require('debug')('scrappy:accounts')
let assert = require('assert')
let bcrypt = require('bcrypt-nodejs')
let Promise = require('bluebird')

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
    createAccount(email, password) {
        
        return new Promise((resolve, reject) => {
            
            db.open().then(context => { 
            
                let collection = context.collection('accounts')
                        
                collection.ensureIndex('email', { unique: true }, function(err, result) {
                    
                    collection.insertOne({
                        email: email,
                        password: bcrypt.hashSync(password),
                        setupComplete: false
                    }, (err, result) => {
                        resolve(result)
                    })
                })           
            })
        })
    }
}