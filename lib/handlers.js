const fortune = require('./fortune')
exports.api = {}
exports.home = (req,res)=> res.render('home')
exports.about = (req,res)=> res.render('about', {fortune: fortune.getFortune()})
exports.sectionTest = (req, res) => res.render('section-test')
// **** these handlers are for fetch/JSON form handlers
exports.newsletter = (req, res) => {
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}
exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
}
// **** end fetch/JSON form handlers

exports.vacationPhotoContestAjax = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}

exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({ result: 'success' })
}
exports.api.vacationPhotoContestError = (req, res, message) => {
    res.send({ result: 'error', error: message })
}

exports.notFound = (req,res)=>res.render('404')
exports.serverError = (err,req,res, next)=>res.render('500')