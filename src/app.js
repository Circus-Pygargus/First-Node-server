// Nodejs core modules
const path = require('path')

/* npm modules */
const express = require('express')
// hbs module so we can use partial templates (not needed for the line app.set('view engine', 'hbs') below)
const hbs = require ('hbs')
 
/* personnal modules */
// will give back latitude and longitude when given an address
const geocode = require('../src/utils/geocode')
// will give weather forecast back when given latitude and longitude
const forecast = require('../src/utils/weatherForecast')
// const beaMessage = require('../src/utils/messageForBea')

// we want to be able to use express
const app = express()

// the server is shared in local network
const hostname = '10.0.0.115'
// server port to use (given by Heroku or 3000 if locally)
const port = process.env.PORT || 3000

/* Define paths for express config */
// build the public path from absolute path : __dirname
const publicDirectoryPath = path.join(__dirname, '../public')
// explain where is located the views directory (because we want to move it from /web-server/views)
const viewsPath = path.join(__dirname, '../templates/views')
// the partials templates location
const partialsPath = path.join(__dirname, '../templates/partials')

/* Setup handlebars engine and views location */
// Tell express we want to use npm module hbs as a template engine
app.set('view engine', 'hbs')
// Tell express we have moved the views directory (only if moved or renamed)
app.set('views', viewsPath)
// Tell hbs we're gonna use some partials templates
hbs.registerPartials(partialsPath)

/* Setup static directory to serve */
// with this, we don't need a route for '', il will send directly to public path (so the index.html wich is inside)
// no need either of routes for '/help' and '/about' as I've created public/about/index.html and public/help/index.html
// Ici on voit bien que ce ne sera utiliser que par des pages statiques et non dynamiques ;)
app.use(express.static(publicDirectoryPath)) 

// création d'une route pour '' car on veut appeller une vue
app.get('', (req, res) => {
    // envoie un rendu du template /views/index.hbs
    res.render('index', {
        title: 'Weather',
        author: 'VioK Circus Pygargus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'VioK Circus Pygargus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'VioK Circus Pygargus',
        helpMessage: `Message d'aide fictif pour les tests !`
    })
})

// route for weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Il faut entrer une adresse !'
        })
    }
    
    // Ici on récupère les propriétés de l'objet data et on les attribute à des variables du même nom
    // évitant ainsi d'écrire plus loin: data.lat, data.lon ...
    // on aurait pu inclure cette ligne dans l'appel de geocode, mais on va faire autrement :
    // geocode(command, (error, data) => {
    // const {lat, lon, msg, placeName} = data;
    geocode(req.query.address, (error, { lat, lon, msg, placeName } = {}) => {
        if (error) {
            return res.send({
                // ici je pourrais écrire juste error (racourci ES6 la propriété a le même nom que la variable)
                error: error
            })
        }    
        // Grâce au return dans le if ci-dessus, on quittera geocode si erreur, donc pas besoin de if (data) pour ce qui suit =)

        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            
            // will read here only if no error (because of return)
            res.send({
                addressRequest: req.query.address,
                location: placeName,
                forecast: forecastData
            })
        });
    });
})

// spécial route for Béa
// app.get('/bea', (req, res) => {
//     res.render('bea', {
//         title: `Béa's Special Page`,
//         author: 'VioK Circus Pygargus',
//         specialMessage: beaMessage()
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather app',
        author: 'VioK Circus Pygargus',
        message404: 'Help article not found !'
    })
})

// Gestion 404, attention !!! toujours mettre en dernier des app.get()
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help section',
        author: 'VioK Circus Pygargus',
        message404: 'Page not found !'
    })
})
 
// Ici on appelle un listener sur le port qui permettra de logguer de nombreuses infos
app.listen(port, hostname, () => {
    console.log(`Server is up at ${hostname}:${port} !`)
})