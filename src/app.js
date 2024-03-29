const path = require('path');
const express = require("express");
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT ||  3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")


//Setup Handle Bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Cozmin Ghenea'
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Cozmin Ghenea'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Cozmin Ghenea '
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send("There's no adress introduced, Please insert an andress")
    }
    geocode(req.query.address, (error, {latitude=0, longitude=0, location="undefined"}={}) => {
        if (error) {
            return res.send({  error  })
        }
        forecast(latitude, longitude, (error, {Progrnoza,Temperatura,Precipitatii,Umiditate,Maxima,Minima}) => {
            if (error) {
                return res.send({ error  })
            }
            res.send({
                location: location,
                Progrnoza : Progrnoza,
                Temperatura :Temperatura,
                Precipitatii :Precipitatii,
                Umiditate: Umiditate,
                Maxima: Maxima,
                Minima: Minima
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.cozmin) {
        return res.send({
            error: " You must provide a search term"
        })
    }
    console.log(req.query.cozmin)
    res.send({
        products: [],
    })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "404: The Help Article couldn't been found",
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "404: This page couldn't been found",
    })
})



app.listen(port, () => {
    console.log('Server is up on port .' + port)
})