const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')

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

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(weatherMiddlware)


app.get('/',handlers.home)
app.get('/about',handlers.about)
app.get('/section-test',handlers.sectionTest)

app.get('/headers', (req,res) =>{
console.log(res)
    res.type('text/plan')

    const headers = Object.entries(req.headers)
        .map(([key,value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})


// Пользовательсткая страница 404
app.use(handlers.notFound)

// Пользовательская страница 500
app.use(handlers.serverError)




if(require.main === module){
    app.listen(port,()=>console.log(`Express запущен на http://localhost:${port};`))
} else {
    module.exports = app
}
