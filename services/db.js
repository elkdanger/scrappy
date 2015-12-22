'use strict'

let mongodb = require('mongodb')
let MongoClient = mongodb.MongoClient
let assert = require('assert')
let config = require('config').get('database')
let debug = require('debug')('scrappy:db')
let Promise = require('bluebird')

let connect = Promise.promisify(mongodb.connect)

module.exports = {
    
    /**
     * Opens a connection to the database
     */
    open() {
        return connect(config.connectionString)
    },
    
    /**
     * Generates a new mongodb id
     * @param id The id
     */
    id(id) {
        return new mongodb.ObjectID(id)
    }
}