const express = require('express')
const app = express()
const port = 8000
const morgan = require("morgan")
const path = require("path")
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
app.use(express.static(path.join(__dirname , 'public')))

app.use(morgan('combined'))

//handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, 'resources/views'))

app.use(express.json())
app.use(express.urlencoded({extended: true }))

app.use(cookieParser())

//init router 
const routes = require('./routes')
routes(app)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})