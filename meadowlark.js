const express = require('express')
const expressHandlebars = require('express-handlebars')

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

const fortunes = [
    "Предсказание 1",
    "Предсказание 2",
    "Предсказание 3",
    "Предсказание 4",
]


app.get('/',(req,res)=> res.render('home'))

app.get('/about',(req,res)=> {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})
})



// Пользовательсткая страница 404
app.use((req,res)=>{
    res.status(404)
    res.render('404')
})

// Пользовательская страница 500
app.use((err,req,res, next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port,()=>console.log(`Express запущен на http://localhost:${port};`))


