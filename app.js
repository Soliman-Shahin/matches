const express = require('express')
const app = express()
const db = require('./config/database')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')

// bring ejs template
app.set('view engine', 'ejs')

// bring body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//bring static
app.use(express.static('public'))
app.use(express.static('node_modules'))

// session and flash config .
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))
app.use(flash())

// bring matches routes
const matches = require('./routes/match-routes')
app.use('/matches', matches)

app.get('/', (req, res) => {
    res.redirect('/matches')
})

// listen to port 3000
app.listen(6400, () => {
    console.log(' app is working on port 6400')
})