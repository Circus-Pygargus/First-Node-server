// form
const weatherForm = document.querySelector('#weather-form')
// input
const weatherSearch = document.querySelector('#weather-input')
// result
const weatherDiv = document.querySelector('#weather-section')

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
                                else {
                                    weatherDiv.innerHTML = data.html
                                    weatherSearch.value = ''
                                }
                            })
                        })
                    })
                }

            }
            else {
                weatherDiv.innerHTML = data.htmlweatherDiv
                weatherSearch.value = ''
            }
        })
    })
})