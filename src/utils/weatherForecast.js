const superagent = require ('superagent');

const readableForecast  = require ('../utils/weatherReadableForecast');

const weatherForecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=c2ed6840f7d2c94dd3f33ea785249525&units=metric&lang=fr`;
    
    superagent
    .get(url)
    // Ici on veut juste utiliser response.body, on peut donc destructurer en ne prenant que la partie qui nous intérresse dans l'objet response
    // .end((error, response) => {
    .end((error, { body }) => {
        // An error occured
        if (error) {
            // no response given, so it's a low level error
            if (!body) {
                callback('Impossible de se connecter au service météo !', undefined);
            }
            // error and response both given (error is given in response.body.message)
            else {
                callback(`Je n'ai pas réussi à trouver ce lieu ! Erreur : ${body.message}`, undefined);
            }
        }
        // No error, we got some result
        else {  
            // ici on veut récupérer la partie current de l'objet body
            // const current = body.current;
            // const { current } = body;
            // callback(undefined, `Temps: ${current.weather[0].description}. Il fait actuellement ${current.temp} degrés, resenti ${current.feels_like} degrés, le taux d'humidité est de ${current.humidity}%.`);
            console.log('pre dt');
            const myForecast = readableForecast(body)
            console.log('post dt');
            // callback(undefined, body);
            callback(undefined, readableForecast);
        }
    });
};

module.exports = weatherForecast;

/* Liens intéressants : 

le contenu de current avec explications
https://openweathermap.org/current

les différentes conditions reçues (pour gèrer les images correspondantes)
https://openweathermap.org/weather-conditions

*/


/* exemple de réception :

response.body.current = {
  dt: 1588540144,
  sunrise: 1588479244,
  sunset: 1588531692,
  temp: 12.22,
  feels_like: 11.75,
  pressure: 1020,
  humidity: 82,
  dew_point: 9.24,
  uvi: 7.05,
  clouds: 94,
  wind_speed: 0.45,
  wind_deg: 248,
  wind_gust: 2.68,
  weather: [ { id: 804, main: 'Clouds', description: 'couvert', icon: '04n' } ]
}


response.body.daily[0] = {
  dt: 1588503600,
  sunrise: 1588479244,
  sunset: 1588531692,
  temp: {
    day: 12.22,
    min: 10.72,
    max: 12.22,
    night: 10.72,
    eve: 12.22,
    morn: 12.22
  },
  feels_like: { day: 11.16, night: 9.29, eve: 11.16, morn: 11.16 },
  pressure: 1020,
  humidity: 82,
  dew_point: 9.24,
  wind_speed: 1.29,
  wind_deg: 191,
  weather: [ { id: 804, main: 'Clouds', description: 'couvert', icon: '04n' } ],
  clouds: 94,
  uvi: 7.05
}


response.body.hourly[0] = {
  dt: 1589108400,
  temp: 20.56,
  feels_like: 19.54,
  pressure: 1008,
  humidity: 50,
  dew_point: 9.79,
  clouds: 43,
  wind_speed: 1.43,
  wind_deg: 282,
  weather: [
    { id: 500, main: 'Rain', description: 'légère pluie', icon: '10d' }
  ],
  rain: { '1h': 0.23 }
}


response.body = {
  lat: 47.39,
  lon: 6.41,
  timezone: 'Europe/Paris',
  current: {
    dt: 1588540144,
    sunrise: 1588479244,
    sunset: 1588531692,
    temp: 12.22,
    feels_like: 11.75,
    pressure: 1020,
    humidity: 82,
    dew_point: 9.24,
    uvi: 7.05,
    clouds: 94,
    wind_speed: 0.45,
    wind_deg: 248,
    wind_gust: 2.68,
    weather: [ [Object] ]
  },
  hourly: [
    {
      dt: 1588539600,
      temp: 12.22,
      feels_like: 11.16,
      pressure: 1020,
      humidity: 82,
      dew_point: 9.24,
      clouds: 94,
      wind_speed: 1.29,
      wind_deg: 191,
      weather: [Array]
    },
    {
      dt: 1588543200,
      temp: 10.77,
      feels_like: 9.32,
      pressure: 1020,
      humidity: 83,
      dew_point: 8,
      clouds: 89,
      wind_speed: 1.4,
      wind_deg: 191,
      weather: [Array]
    },
    {
      dt: 1588546800,
      temp: 9.81,
      feels_like: 8.19,
      pressure: 1019,
      humidity: 84,
      dew_point: 7.24,
      clouds: 84,
      wind_speed: 1.4,
      wind_deg: 189,
      weather: [Array]
    },
    {
      dt: 1588550400,
      temp: 9.34,
      feels_like: 7.64,
      pressure: 1019,
      humidity: 84,
      dew_point: 6.78,
      clouds: 78,
      wind_speed: 1.36,
      wind_deg: 198,
      weather: [Array]
    },
    {
      dt: 1588554000,
      temp: 10.36,
      feels_like: 8.83,
      pressure: 1019,
      humidity: 83,
      dew_point: 7.6,
      clouds: 87,
      wind_speed: 1.39,
      wind_deg: 194,
      weather: [Array]
    },
    {
      dt: 1588557600,
      temp: 10.26,
      feels_like: 8.76,
      pressure: 1019,
      humidity: 84,
      dew_point: 9.75,
      clouds: 83,
      wind_speed: 1.37,
      wind_deg: 206,
      weather: [Array]
    },
    {
      dt: 1588561200,
      temp: 9.58,
      feels_like: 7.96,
      pressure: 1018,
      humidity: 85,
      dew_point: 9.26,
      clouds: 72,
      wind_speed: 1.38,
      wind_deg: 198,
      weather: [Array]
    },
    {
      dt: 1588564800,
      temp: 8.99,
      feels_like: 7.37,
      pressure: 1018,
      humidity: 85,
      dew_point: 8.69,
      clouds: 64,
      wind_speed: 1.19,
      wind_deg: 203,
      weather: [Array]
    },
    {
      dt: 1588568400,
      temp: 9.36,
      feels_like: 7.95,
      pressure: 1018,
      humidity: 85,
      dew_point: 9.04,
      clouds: 58,
      wind_speed: 1,
      wind_deg: 204,
      weather: [Array]
    },
    {
      dt: 1588572000,
      temp: 11.46,
      feels_like: 10.34,
      pressure: 1018,
      humidity: 81,
      dew_point: 10.47,
      clouds: 54,
      wind_speed: 1.04,
      wind_deg: 212,
      weather: [Array]
    },
    {
      dt: 1588575600,
      temp: 13.34,
      feels_like: 12.02,
      pressure: 1019,
      humidity: 76,
      dew_point: 11.33,
      clouds: 44,
      wind_speed: 1.65,
      wind_deg: 247,
      weather: [Array]
    },
    {
      dt: 1588579200,
      temp: 14.61,
      feels_like: 13.09,
      pressure: 1018,
      humidity: 71,
      dew_point: 11.5,
      clouds: 57,
      wind_speed: 2.01,
      wind_deg: 264,
      weather: [Array]
    },
    {
      dt: 1588582800,
      temp: 15.12,
      feels_like: 13.51,
      pressure: 1018,
      humidity: 70,
      dew_point: 11.83,
      clouds: 68,
      wind_speed: 2.24,
      wind_deg: 274,
      weather: [Array]
    },
    {
      dt: 1588586400,
      temp: 16.18,
      feels_like: 14.47,
      pressure: 1018,
      humidity: 67,
      dew_point: 11.99,
      clouds: 70,
      wind_speed: 2.53,
      wind_deg: 281,
      weather: [Array]
    },
    {
      dt: 1588590000,
      temp: 16.96,
      feels_like: 15.03,
      pressure: 1017,
      humidity: 64,
      dew_point: 12.06,
      clouds: 72,
      wind_speed: 2.86,
      wind_deg: 289,
      weather: [Array]
    },
    {
      dt: 1588593600,
      temp: 17.6,
      feels_like: 15.44,
      pressure: 1017,
      humidity: 61,
      dew_point: 12.05,
      clouds: 75,
      wind_speed: 3.14,
      wind_deg: 300,
      weather: [Array]
    },
    {
      dt: 1588597200,
      temp: 18.57,
      feels_like: 16.59,
      pressure: 1017,
      humidity: 58,
      dew_point: 12.16,
      clouds: 75,
      wind_speed: 2.95,
      wind_deg: 303,
      weather: [Array]
    },
    {
      dt: 1588600800,
      temp: 19.29,
      feels_like: 17.71,
      pressure: 1016,
      humidity: 55,
      dew_point: 12.11,
      clouds: 74,
      wind_speed: 2.33,
      wind_deg: 295,
      weather: [Array]
    },
    {
      dt: 1588604400,
      temp: 19.19,
      feels_like: 17.47,
      pressure: 1015,
      humidity: 55,
      dew_point: 11.93,
      clouds: 75,
      wind_speed: 2.49,
      wind_deg: 296,
      weather: [Array]
    },
    {
      dt: 1588608000,
      temp: 18.5,
      feels_like: 16.84,
      pressure: 1015,
      humidity: 59,
      dew_point: 12.39,
      clouds: 80,
      wind_speed: 2.56,
      wind_deg: 313,
      weather: [Array]
    },
    {
      dt: 1588611600,
      temp: 17.47,
      feels_like: 16.33,
      pressure: 1015,
      humidity: 67,
      dew_point: 13.27,
      clouds: 80,
      wind_speed: 2.2,
      wind_deg: 339,
      weather: [Array]
    },
    {
      dt: 1588615200,
      temp: 15.14,
      feels_like: 14.23,
      pressure: 1015,
      humidity: 77,
      dew_point: 13.25,
      clouds: 78,
      wind_speed: 1.82,
      wind_deg: 12,
      weather: [Array]
    },
    {
      dt: 1588618800,
      temp: 12.62,
      feels_like: 11.68,
      pressure: 1016,
      humidity: 82,
      dew_point: 11.74,
      clouds: 98,
      wind_speed: 1.26,
      wind_deg: 44,
      weather: [Array]
    },
    {
      dt: 1588622400,
      temp: 11.68,
      feels_like: 10.62,
      pressure: 1017,
      humidity: 82,
      dew_point: 10.81,
      clouds: 88,
      wind_speed: 1.1,
      wind_deg: 67,
      weather: [Array]
    },
    {
      dt: 1588626000,
      temp: 11.1,
      feels_like: 9.61,
      pressure: 1018,
      humidity: 83,
      dew_point: 10.41,
      clouds: 59,
      wind_speed: 1.58,
      wind_deg: 89,
      weather: [Array]
    },
    {
      dt: 1588629600,
      temp: 10.85,
      feels_like: 8.79,
      pressure: 1017,
      humidity: 83,
      dew_point: 10.21,
      clouds: 54,
      wind_speed: 2.3,
      wind_deg: 92,
      weather: [Array]
    },
    {
      dt: 1588633200,
      temp: 10.76,
      feels_like: 8.21,
      pressure: 1017,
      humidity: 82,
      dew_point: 9.85,
      clouds: 51,
      wind_speed: 2.92,
      wind_deg: 91,
      weather: [Array]
    },
    {
      dt: 1588636800,
      temp: 10.64,
      feels_like: 7.51,
      pressure: 1017,
      humidity: 79,
      dew_point: 9.29,
      clouds: 54,
      wind_speed: 3.52,
      wind_deg: 88,
      weather: [Array]
    },
    {
      dt: 1588640400,
      temp: 10.62,
      feels_like: 7.13,
      pressure: 1016,
      humidity: 77,
      dew_point: 8.87,
      clouds: 100,
      wind_speed: 3.91,
      wind_deg: 93,
      weather: [Array]
    },
    {
      dt: 1588644000,
      temp: 10.87,
      feels_like: 7.54,
      pressure: 1016,
      humidity: 75,
      dew_point: 8.64,
      clouds: 100,
      wind_speed: 3.64,
      wind_deg: 91,
      weather: [Array]
    },
    {
      dt: 1588647600,
      temp: 10.96,
      feels_like: 8.12,
      pressure: 1017,
      humidity: 75,
      dew_point: 8.73,
      clouds: 100,
      wind_speed: 2.96,
      wind_deg: 114,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588651200,
      temp: 10.6,
      feels_like: 8.35,
      pressure: 1016,
      humidity: 80,
      dew_point: 9.33,
      clouds: 100,
      wind_speed: 2.31,
      wind_deg: 125,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588654800,
      temp: 10.85,
      feels_like: 8.9,
      pressure: 1016,
      humidity: 83,
      dew_point: 10.11,
      clouds: 100,
      wind_speed: 2.15,
      wind_deg: 125,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588658400,
      temp: 11.36,
      feels_like: 9.09,
      pressure: 1016,
      humidity: 83,
      dew_point: 10.71,
      clouds: 100,
      wind_speed: 2.78,
      wind_deg: 75,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588662000,
      temp: 11.45,
      feels_like: 9.12,
      pressure: 1016,
      humidity: 84,
      dew_point: 10.92,
      clouds: 100,
      wind_speed: 2.96,
      wind_deg: 91,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588665600,
      temp: 11.81,
      feels_like: 8.72,
      pressure: 1016,
      humidity: 83,
      dew_point: 11.14,
      clouds: 100,
      wind_speed: 4.11,
      wind_deg: 81,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588669200,
      temp: 12.18,
      feels_like: 9.19,
      pressure: 1015,
      humidity: 82,
      dew_point: 11.22,
      clouds: 100,
      wind_speed: 4.03,
      wind_deg: 83,
      weather: [Array]
    },
    {
      dt: 1588672800,
      temp: 13.84,
      feels_like: 10.88,
      pressure: 1015,
      humidity: 75,
      dew_point: 11.53,
      clouds: 100,
      wind_speed: 4.1,
      wind_deg: 75,
      weather: [Array]
    },
    {
      dt: 1588676400,
      temp: 16.17,
      feels_like: 13.16,
      pressure: 1015,
      humidity: 65,
      dew_point: 11.74,
      clouds: 100,
      wind_speed: 4.2,
      wind_deg: 76,
      weather: [Array]
    },
    {
      dt: 1588680000,
      temp: 17.03,
      feels_like: 14.14,
      pressure: 1015,
      humidity: 63,
      dew_point: 12.07,
      clouds: 100,
      wind_speed: 4.17,
      wind_deg: 72,
      weather: [Array]
    },
    {
      dt: 1588683600,
      temp: 16.2,
      feels_like: 13.56,
      pressure: 1015,
      humidity: 69,
      dew_point: 12.61,
      clouds: 100,
      wind_speed: 4.04,
      wind_deg: 69,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588687200,
      temp: 16.4,
      feels_like: 14.16,
      pressure: 1015,
      humidity: 72,
      dew_point: 13.49,
      clouds: 100,
      wind_speed: 3.8,
      wind_deg: 69,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588690800,
      temp: 16.12,
      feels_like: 14.05,
      pressure: 1015,
      humidity: 74,
      dew_point: 13.63,
      clouds: 100,
      wind_speed: 3.62,
      wind_deg: 69,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588694400,
      temp: 15.37,
      feels_like: 13.26,
      pressure: 1015,
      humidity: 76,
      dew_point: 13.26,
      clouds: 100,
      wind_speed: 3.54,
      wind_deg: 70,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588698000,
      temp: 14.79,
      feels_like: 12.38,
      pressure: 1016,
      humidity: 76,
      dew_point: 12.78,
      clouds: 97,
      wind_speed: 3.74,
      wind_deg: 78,
      weather: [Array],
      rain: [Object]
    },
    {
      dt: 1588701600,
      temp: 13.92,
      feels_like: 11.63,
      pressure: 1016,
      humidity: 77,
      dew_point: 12.14,
      clouds: 90,
      wind_speed: 3.32,
      wind_deg: 85,
      weather: [Array]
    },
    {
      dt: 1588705200,
      temp: 12.36,
      feels_like: 10.18,
      pressure: 1017,
      humidity: 80,
      dew_point: 11.16,
      clouds: 77,
      wind_speed: 2.81,
      wind_deg: 86,
      weather: [Array]
    },
    {
      dt: 1588708800,
      temp: 11.75,
      feels_like: 9.53,
      pressure: 1018,
      humidity: 82,
      dew_point: 10.86,
      clouds: 85,
      wind_speed: 2.78,
      wind_deg: 90,
      weather: [Array]
    }
  ],
  daily: [
    {
      dt: 1588503600,
      sunrise: 1588479244,
      sunset: 1588531692,
      temp: [Object],
      feels_like: [Object],
      pressure: 1020,
      humidity: 82,
      dew_point: 9.24,
      wind_speed: 1.29,
      wind_deg: 191,
      weather: [Array],
      clouds: 94,
      uvi: 7.05
    },
    {
      dt: 1588590000,
      sunrise: 1588565552,
      sunset: 1588618175,
      temp: [Object],
      feels_like: [Object],
      pressure: 1017,
      humidity: 61,
      dew_point: 12.05,
      wind_speed: 3.14,
      wind_deg: 300,
      weather: [Array],
      clouds: 75,
      uvi: 6.54
    },
    {
      dt: 1588676400,
      sunrise: 1588651862,
      sunset: 1588704657,
      temp: [Object],
      feels_like: [Object],
      pressure: 1015,
      humidity: 63,
      dew_point: 12.07,
      wind_speed: 4.17,
      wind_deg: 72,
      weather: [Array],
      clouds: 100,
      rain: 3.82,
      uvi: 6.3
    },
    {
      dt: 1588762800,
      sunrise: 1588738173,
      sunset: 1588791139,
      temp: [Object],
      feels_like: [Object],
      pressure: 1019,
      humidity: 54,
      dew_point: 11.24,
      wind_speed: 3.64,
      wind_deg: 55,
      weather: [Array],
      clouds: 28,
      uvi: 6.64
    },
    {
      dt: 1588849200,
      sunrise: 1588824485,
      sunset: 1588877620,
      temp: [Object],
      feels_like: [Object],
      pressure: 1019,
      humidity: 44,
      dew_point: 9.92,
      wind_speed: 1.1,
      wind_deg: 1,
      weather: [Array],
      clouds: 69,
      uvi: 6.57
    },
    {
      dt: 1588935600,
      sunrise: 1588910799,
      sunset: 1588964101,
      temp: [Object],
      feels_like: [Object],
      pressure: 1017,
      humidity: 45,
      dew_point: 11.47,
      wind_speed: 2.68,
      wind_deg: 304,
      weather: [Array],
      clouds: 2,
      rain: 0.37,
      uvi: 6.76
    },
    {
      dt: 1589022000,
      sunrise: 1588997115,
      sunset: 1589050582,
      temp: [Object],
      feels_like: [Object],
      pressure: 1010,
      humidity: 55,
      dew_point: 14.89,
      wind_speed: 1.46,
      wind_deg: 187,
      weather: [Array],
      clouds: 56,
      rain: 5.63,
      uvi: 6.53
    },
    {
      dt: 1589108400,
      sunrise: 1589083432,
      sunset: 1589137062,
      temp: [Object],
      feels_like: [Object],
      pressure: 1006,
      humidity: 69,
      dew_point: 16.12,
      wind_speed: 2.5,
      wind_deg: 325,
      weather: [Array],
      clouds: 88,
      rain: 13.87,
      uvi: 5.91
    }
  ]
}

*/