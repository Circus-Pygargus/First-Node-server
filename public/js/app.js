const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#weather-input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherDiv = document.querySelector('#weather-section')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Chargement ...'
    messageTwo.textContent = ''

    if (location === '') {
        messageOne.textContent = 'Faut entrer un lieu !'
        return
    }

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            // console.log('data', data)
            // There was an error
            if (data.error) {
                messageOne.textContent = data.error
            }
            // Several places have been found
            else if (data.status === 'places choice') {
                weatherDiv.innerHTML = data.html

                var places = document.querySelector('#weather-places').children
        // console.log(places)
                // places.forEach((place) => {
                for (let i = 0; i < places.length; i++) {
                    var place = places[i]
                    place.addEventListener('click', (e) => {

                        messageOne.textContent = 'Chargement ...'
                        messageTwo.textContent = ''

                        fetch(`/weather?place=${e.target.textContent}&lat=${e.target.dataset.lat}&lon=${e.target.dataset.lon}`).then((response) => {
                            response.json().then((data) => {
                                if (data.error) {
                                    messageOne.textContent = data.error
                                }
                                else {
                                    weatherDiv.innerHTML = data.html
                                }
                            })
                        })
                    })
                }

            }
            else {
                // let weather = data.weatherData
                // console.log(weather.weatherHTML)
                // messageOne.textContent = weather.location
                // messageTwo.textContent = weather.forecast 
                weatherDiv.innerHTML = weather.weatherHTML 
            }
        })
    })
})