'use strict'

let mongodb = require('mongodb')
let config = require('config').get('database')
let debug = require('debug')('scrappy:db')
let Promise = require('bluebird')

let client = Promise.promisifyAll(mongodb)

module.exports = {
    
    /**
     * Async mongo client
     */
    client: client,
    
    /**
     * Opens a connection to the database
     */
    connect() {
        return client.connectAsync(config.connectionString)
    },
    
    /**
     * Generates a new mongodb id
     * @param id The id
     */
    id(id) {
        return new mongodb.ObjectID(id)
    }
}