// form
const weatherForm = document.querySelector('#weather-form')
// input
const weatherSearch = document.querySelector('#weather-input')
// result
const weatherDiv = document.querySelector('#weather-section')
// result nav bar
// const forecastNavCurrentBtn = document.querySelecto('#forecast-nav-current')
// const forecastNavHourlyBtn = document.querySelecto('#forecast-nav-hourly')
// const forecastNavDailyBtn = document.querySelecto('#forecast-nav-daily')
// const forecastNavBtns = document.querySelectorAll('.forecast-nav-item')
// // To know witch btn is selected and wich forecast is displayed
// var activeForecast = 'current'
    // var activeForecast = ''

const watchWeatherForm = () => {
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const location = weatherSearch.value

        weatherDiv.textContent = 'Chargement ...'

        if (location === '') {
            weatherDiv.textContent = 'Faut entrer un lieu !'
            return
        }

        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                // There was an error
                if (data.error) {
                    weatherDiv.textContent = data.error
                }
                // Several places have been found
                else if (data.status === 'places choice') {
                    weatherDiv.innerHTML = data.html

                    var places = document.querySelector('#weather-places').children
                    
                    for (let i = 0; i < places.length; i++) {
                        var place = places[i]
                        place.addEventListener('click', (e) => {

                            weatherDiv.textContent = 'Chargement ...'

                            fetch(`/weather?place=${e.target.textContent}&lat=${e.target.dataset.lat}&lon=${e.target.dataset.lon}`).then((response) => {
                                response.json().then((data) => {
                                    if (data.error) {
                                        weatherDiv.textContent = data.error
                                    }
                                    // Here is the weather forecast
                                    else {
                                        console.log('fetch response received successfully')

                                        weatherDiv.innerHTML = data.html
                                        weatherSearch.value = ''
                    
                                        console.log('html rendered')
                                        let forecastNavBtns = document.querySelectorAll('.forecast-nav-item')
                                        watchForecastNav(forecastNavBtns)
                    
                                        console.log('should be watching forecast nav buttons')
                                    }
                                })
                            })
                        })
                    }

                }
                // Perfect match on search place: here is the weather forecast
                else {
                    console.log('direct fetch response received successfully')
                    weatherDiv.innerHTML = data.htmlweatherDiv
                    weatherSearch.value = ''
                    console.log('html rendered')
                    // need to watch forecast navigation buttons
                    let forecastNavBtns = document.querySelectorAll('.forecast-nav-item')
                    watchForecastNav(forecastNavBtns)
                    console.log('should be watching forecast nav buttons')
                }
            })
        })
    })
}


const getActivForecast = (navBtns) => {
    let active = ''
    navBtns.forEach((navBtn) => {
        if (navBtn.classList.contains('active-forecast')) {
            active = navBtn.dataset.forecast
        }
    })
    return active
} 


const watchForecastNav = (forecastNavBtns) => {
console.log('watching forecast nav buttons')
    
//     activeForecast = 'current'
// console.log('first active', activeForecast)
    forecastNavBtns.forEach((navBtn) => {
        navBtn.addEventListener('click', (e) => {
            if (navBtn.classList.contains('active-forecast')) return
            
            let active = getActivForecast(forecastNavBtns)
            document.querySelector('.forecast-nav-item.active-forecast').classList.remove('active-forecast')
            navBtn.classList.add('active-forecast')
console.log('active', active)
console.log('final', document.querySelector(`#forecast-${active}`))
            document.querySelector(`#forecast-${active}`).classList.remove('active-forecast')
            document.querySelector(`#forecast-${navBtn.dataset.forecast}`).classList.add('active-forecast')
        })
    })
}


watchWeatherForm()
// watchForecastNav()