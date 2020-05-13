const fs = require('fs')

const saveForecast = (forecast) => {
    fs.writeFileSync('./src/utils/saved-forecasts/forecast.json', JSON.stringify(forecast))
    console.log('saved file')
}

const loadForecast = () => {
    try {
        const dataBuffer = fs.readFileSync('./src/utils/saved-forecasts/forecast.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        // ici si erreur dans le try (par exemple le fichier n'existe pas, on retourne une Array vide et du coup on créera le fichier avec addNote)
        return e;
    }
}

module.exports = {
    save: saveForecast,
    load: loadForecast
}