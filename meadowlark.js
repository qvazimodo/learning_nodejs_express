const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()




//Настройка механизма представления Handlebars
app.engine('handlebars', expressHandlebars.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: 'main'
    }
))
app.set('view engine', "handlebars")

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))


app.get('/',handlers.home)
app.get('/about',handlers.about)

// Пользовательсткая страница 404
app.use(handlers.notFound)

// Пользовательская страница 500
app.use(handlers.serverError)



if(require.main === module){
    app.listen(port,()=>console.log(`Express запущен на http://localhost:${port};`))
} else {
    module.exports = app
}
