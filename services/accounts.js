'use strict'

let db = require('./db')
let debug = require('debug')('scrappy:accounts')
let assert = require('assert')
let bcrypt = require('bcrypt-nodejs')

module.exports = {
    
    /**
     * Finds an account given the email address
     * @param email The email address
     */
    findByEmail(email) {        
      return db.connect().then(context => 
        context.collection('accounts').findOne({ email: email }))        
    },
    
    /**
     * Creates an account with the specified email
     * @param email The email address
     */
    createAccount(email, password) {
        
        return db.connect()
            .then(context => {
                let collection = context.collection('accounts')
                
                return collection.ensureIndexAsync('email', { unique: true })
                    .then(result =>                       
                        collection.insertOneAsync({
                            email: email,
                            password: bcrypt.hashSync(password),
                            setupComplete: false
                        }))                
            })
    }
}