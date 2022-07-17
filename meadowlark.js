const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const app = express()


//Настройка механизма представления Handlebars
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))

app.set('view engine', "handlebars")

app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(weatherMiddlware)


app.get('/',handlers.home)

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get('/about',handlers.about)
app.get('/section-test',handlers.sectionTest)

app.get('/headers', (req,res) =>{
console.log(res)
    res.type('text/plan')

    const headers = Object.entries(req.headers)
        .map(([key,value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})
// vacation photo contest
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
        console.log('got fields: ', fields)
        console.log('and files: ', files)
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)

// Пользовательсткая страница 404
app.use(handlers.notFound)

// Пользовательская страница 500
app.use(handlers.serverError)




if(require.main === module){
    app.listen(port,()=>console.log(`Express запущен на http://localhost:${port};`))
} else {
    module.exports = app
}
