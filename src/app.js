const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)


//setup static direcory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Nico Pogi!'
    })
})
app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About Me',
        name: 'Nico Pogi!'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help ME!',
        name: 'Nico Pogi!'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must porvide an Address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})





app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: ' You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nico ranin',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'nico pogi',
        errorMessage: 'page not found'
    })
})



app.listen(3000, () => {
    console.log('server is up on port 3000')
})
