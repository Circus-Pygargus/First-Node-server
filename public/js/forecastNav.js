
    // To know witch btn is selected and wich forecast is displayed
    var activeForecast = ''

getActivForecast = () => {
    let active = ''
    forecastNavBtns.forEach((navBtn) => {
        if (navBtn.classList.contains('active-forecast')) {
            active = navBtn.dataset.forecast
        }
    })
    return active
} 


const watchForecastNav = () => {
console.log('watching forecast nav')
    const forecastNavBtns = document.querySelectorAll('.forecast-nav-item')
    activeForecast = 'current'
    forecastNavBtns.forEach((navBtn) => {
        navBtn.addEventListener('click', (e) => {
            if (navBtn.classList.contains('active-forecast')) return
            
            var active = getActivForecast()
            document.querySelector('.forecast-nav-item.active-forecast').classList.remove('active-forecast')
            navBtn.classList.add('active-forecast')
console.log('active', active)
console.log('final', document.querySelector(`#forecast-${active}`))
            document.querySelector(`#forecast-${active}`).classList.remove('active-forecast')
            document.querySelector(`#forecast-${navBtn.dataset.forecast}`).classList.add('active-forecast')
        })
    })
}


watchForecastNav()