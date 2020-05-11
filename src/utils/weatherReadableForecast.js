/**
 * Makes forecast received by api readable in hbs files
 * 
 * @param {object} data - Forecast from api
 * 
 * @return {object} forecast - Readable forecast
 */
const readableForecast = (data) => {
    const weekDayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    var dateTZ = timeZoneDate(data.timezone, data.current.dt * 1000)
    var forecast = {}
    /* current part */
// const dir = getWindDirection(data.current.wind_deg)
// console.log('direction', dir)
// console.log('test direction', getWindDirection(data.current.wind_deg))
    forecast.current = {
        dt: dateTZ,
        temp: Math.round(data.current.temp * 10) / 10,      // only one decimal digit
        feels_like: Math.round(data.current.feels_like * 10) / 10,
        humidity: data.current.humidity,
        clouds: data.current.clouds,
        wind_speed: convertWindSpeed(data.current.wind_speed),  // We want some km/h
        wind_direction: getWindDirection(data.current.wind_deg),
        description: data.current.weather[0].description,
        picture: getPictureName(data.current.weather[0].id)
    }
    /* daily part */
    forecast.daily = []
    for (let i = 0; i < data.daily.length; i++) {
        let dateDailyTZ = timeZoneDate(data.timezone, data.daily[i].dt * 1000)
        let dateSunriseTZ = timeZoneDate(data.timezone, data.daily[i].sunrise * 1000)
        let dateSunsetTZ = timeZoneDate(data.timezone, data.daily[i].sunset * 1000)
        forecast.daily[i] = {
            dayName: weekDayNames[dateDailyTZ.getDay()],
            dayNb: dateDailyTZ.getDate(),
            month: monthNames[dateDailyTZ.getMonth()],
            sunrise: dateSunriseTZ.toLocaleString('en-GB').split(',')[1].trim(),
            sunset: dateSunsetTZ.toLocaleString('en-GB').split(',')[1].trim(),

            temp: {
                min: Math.round(data.daily[i].temp.min * 10) / 10,
                max: Math.round(data.daily[i].temp.max * 10) / 10
            },
            feels_like: {
                min: Math.round(data.daily[i].feels_like.night * 10) / 10,
                max: Math.round(data.daily[i].feels_like.day * 10) / 10
            },

            humidity: data.daily[i].humidity,
            clouds: data.daily[i].clouds,

            wind_speed: convertWindSpeed(data.daily[i].wind_speed),
            wind_direction: getWindDirection(data.daily[i].wind_deg),

            description: data.daily[i].weather[0].description,
            picture: getPictureName(data.daily[i].weather[0].id)
        }
    }


// console.log(new Date(data.current.dt*1000))   

// timeZoneDate(data.timezone, data.current.dt)

console.log(forecast)

    return forecast
}


// response.body.daily[0] = {
//     dt: 1588503600,           ???
//     sunrise: 1588479244,      yes
//     sunset: 1588531692,          yes
//     temp: {
//       day: 12.22,         yes
//       min: 10.72,         yes
//       max: 12.22,      yes
//       night: 10.72,      yes
//       eve: 12.22,
//       morn: 12.22
//     },
//     feels_like: { day: 11.16, night: 9.29, eve: 11.16, morn: 11.16 },   yes
//     pressure: 1020,
//     humidity: 82,      yes
//     dew_point: 9.24,
//     wind_speed: 1.29,      yes
//     wind_deg: 191,      yes
//     weather: [ { id: 804, main: 'Clouds', description: 'couvert', icon: '04n' } ],      yes
//     clouds: 94,      yes
//     uvi: 7.05
//   }


/**
 * 
 * @param {string} timezone 
 * @param {int} apiDate
 * 
 * @return {date} - date
 */
const timeZoneDate = (timezone, apiDate) => {
    let odate = new Date(apiDate)
    let date = new Date(Date.UTC(odate.getUTCFullYear().toString(), odate.getUTCMonth().toString(), odate.getUTCDay().toString(), odate.getUTCHours().toString(), odate.getUTCMinutes().toString(), odate.getUTCSeconds().toString()))
    let utcDate = new Date(date.toLocaleString('en-US', {timeZone: "UTC"}))  
    let tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }))
    let offset = tzDate.getTime() - utcDate.getTime()
    date.setTime( odate.getTime() + offset )

    return date
}


/**
 * Gives a picture name according to received weather id
 * 
 * @param {int} weatherId - Weather Id given by api
 * 
 * @return {string} weatherPicture - The picture name
 */
const getPictureName = (weatherId) => {
    const weatherPicture = 'monImage.gif'
    return weatherPicture
}


/**
 * Converts wind speed from m/s to km/h with a decimal digit precision of 1
 * 
 * @param {number} msSpeed
 * 
 * @return {number} 
 */
const convertWindSpeed = (msSpeed) => {
    return  Math.round((msSpeed * 3.6) * 10) / 10
}


/**
 * Gives readable wind direction
 * 
 * @param {int} degreeDirection - wind direction given by api
 *  
 * @return {string} direction - readable wind direction
 */
const getWindDirection = (degreeDirection) => {
    const directions = [
        {direction: 'N',min: 348.75, max: 11.25},       // this one is a special case
        {direction: 'NNE', min: 11.25, max: 33.75},
        {direction: 'NE', min: 33.75, max: 56.25},
        {direction: 'ENE', min: 56.25, max: 78.75},
        {direction: 'E', min: 78.75, max: 101.25},
        {direction: 'ESE', min: 101.25, max: 123.75},
        {direction: 'SE', min: 123.75, max: 146.25},
        {direction: 'SSE', min: 146.25, max: 168.75},
        {direction: 'S', min: 168.75, max: 191.25},
        {direction: 'SSO', min: 191.25, max: 213.75},
        {direction: 'SO', min: 213.75, max: 236.25},
        {direction: 'OSO', min: 236.25, max: 258.75},
        {direction: 'O', min: 258.75, max: 281.75},
        {direction: 'ONO', min: 281.75, max: 303.75},
        {direction: 'NO', min: 303.75, max: 326.25},
        {direction: 'NNO', min: 326.25, max: 348.75}
    ]
    // just in case, to be sure that degree isn't bigger than 360
    if (degreeDirection > 360) {
        degreeDirection = degreeDirection % 360
    }

    for (let i = 0; i < directions.length; i++) {
        // special case
        if (directions[i].direction === 'N') {
            if (degreeDirection > directions[i].min || degreeDirection < directions[i].max) {
                return directions[i].direction
            }
        }
        else {
            if (degreeDirection > directions[i].min && degreeDirection < directions[i].max){
                return directions[i].direction
            }
        }
    }
}

module.exports = readableForecast