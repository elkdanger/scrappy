/**
 * Handlebars validation helpers
 */

module.exports = {
    
    hasFieldValidation: function(key, options) {

        if (!key) return
        if (!this.modelState) return
        if (this.modelState.keys[key] === undefined) return
            
        return options.fn(this)
    },
    
    fieldValidationMessage: function(key) {            
        return this.modelState.messages[key]
    },
    
    "validation-css": function(key) {
        if (!key) return
        if (!this.modelState) return
        if (this.modelState.keys[key] === undefined) return
        
        if (this.modelState.keys[key] === false)
            return 'has-error'
    }
}