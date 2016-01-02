
module.exports = (req, res, next) => {
    
    if (req.flash) {
        res.locals.infoMessages = req.flash('info')
        res.locals.errorMessages = req.flash('error')
    }    
    
    next()
    
}