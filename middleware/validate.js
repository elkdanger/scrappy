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
    }
    
}

module.exports = (req, res, next) => {
    
    debug(req.method)
    debug(req.body)
    debug(req.url)
    
    if (req.method == 'POST' && validators[req.url]) {
        
        let v = validators[req.url]
        
        req.modelState = {
            isValid: true,
            keys: {},
            messages: {},
            
            getMessageArray() {
                return Object.keys(this.messages).map(key => this.messages[key])
            },
            
            hasModelError(key) {                
                return this.messages[key] == undefined
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
                    req.modelState.messages[key] =
                        v[key].message ? v[key].message : `The ${ key } field is invalid`
                }
                
                req.modelState.isValid = req.modelState.isValid && isValid                
                req.modelState.keys[key] = isValid
            }
        })   
    }
    
    debug(req.modelState)
    
    next()
}