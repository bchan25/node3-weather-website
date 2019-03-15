const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

// Dynamic HTML 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ben'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ben'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text',
        title: 'Help',
        name: 'Ben'
    })
})

// Query String

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address'
        })
    } else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
          
          if(error){
            return res.send({ error })
          }

          forecast(latitude, longitude, (error, {message}) => {
            if(error){
              return res.send({ error })
            }

            res.send({
                forecast: message,
                location,
                address: req.query.address
            })
            
          })
        
        })
      }


    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

// Must come LAST 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben',
        errorMessage: 'Help article note found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben',
        errorMessage: 'Page note found'
    })
})

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))