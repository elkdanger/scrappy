'use strict'

let express = require('express')
let debug = require('debug')('scrappy:validation')
let validator = require('validator')

validator.extend('isValue', str => {
    if (str != null && str != undefined && (str && str.length > 0))
        return true
    return false
})

let validators = {
    
    '/login': {
        email: {
            methods:'isEmail',
            message: 'Please enter a valid email address'
        },
        password: 'isValue'
    },
    
    '/signup': {
        email: {
            methods: 'isEmail',
            message: 'Please enter a valid email address'
        },
        password: {
            methods: 'isLength:6,isAlphanumeric',
            message: 'Please enter a password which is at least 6 letters and numbers'
        },
        
        custom(modelState, req) {
            
            if (req.body.confirmPassword !== req.body.password) {
                modelState.addModelError('confirmPassword', 'Your passwords do not match')   
            }
            
        }
    }
}

module.exports = (req, res, next) => {
    
    // debug(req.method)
    // debug(req.body)
    // debug(req.url)
    // debug(req.headers['content-type'])
    
    if (req.method == 'POST' && validators[req.url] && req.headers['content-type'] == 'application/x-www-form-urlencoded') {
        
        debug('Validating posted form')
        debug(req.body)        
            
        let v = validators[req.url]        
        
        let modelState = {
            isValid: true,
            keys: {},
            messages: {},
            
            getMessageArray() {
                return Object.keys(this.messages).map(key => this.messages[key])
            },
            
            hasModelError(key) {                
                return this.messages[key] == undefined
            },
            
            addModelError(key, message) {
                this.isValid = false
                this.keys[key] = false
                this.messages[key] = message
            }
        }
        
        Object.keys(req.body).forEach(key => {
            if (v[key]) {
                
                var methodString = ''
                
                if (typeof v[key] === 'string')
                    methodString = v[key]
                else if (v[key].methods)
                    methodString = v[key].methods
                
                let methods = methodString.split(',')
                    .map(part => part.trim())
                
                let isValid = true                 
                
                methods.forEach(method => {                                        
                    let args = [req.body[key]]
                    
                    if (method.indexOf(':') > -1) {
                        let parts = method.split(':')
                        args.push(parts[1])
                        method = parts[0]
                    }
                    
                    isValid = isValid && validator[method].apply(validator, args)                    
                })
                
                if (!isValid) {
                    modelState.messages[key] =
                        v[key].message ? v[key].message : `The ${ key } field is invalid`
                }
                
                modelState.isValid = modelState.isValid && isValid                
                modelState.keys[key] = isValid
            }
        })   
        
        if (v.custom) {
            v.custom(modelState, req)
        }
        
        res.locals.modelState = modelState
    }
    
    next()
}