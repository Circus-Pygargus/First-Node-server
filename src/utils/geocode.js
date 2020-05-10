const superagent = require('superagent');



const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=10&access_token=pk.eyJ1IjoiY2lyY3VzLXB5Z2FyZ3VzIiwiYSI6ImNrOW9obWxxZDAwcG0zaHBuYmpiaGp3M2QifQ.SQW3CbywUtgoGGQxyiv6dQ`;

    
    superagent
	.get(url)
	// on aura juste besoin d'utiliser la propriété body de l'objet response, donc on peut déstructurer :
    // .end((error, response) => {
	.end((error, { body }) => {
        // Should come when no web connection
        if (error) {
            callback('Impossible de se connecter au service de localisation !', undefined);
        }
        else if (body.features.length === 0) {
            callback('Emplacement non reconnu, merci de choisir une autre adresse.', undefined);
        }
        else {
			var flag = false;
			
            body.features.forEach((place) => {
                if (place.text === address) {
					// J'aurais bien voulu déstructurer ici aussi, mais on ne peut pas à cause des [0]
                    // const {msg = 'Adresse trouvée !', place_name:placeName, center[0]:lon, center[1]:lat} = place;					
					callback(undefined, {
						msg: 'Adresse trouvée !',
						placeName: place.place_name,
						lon: place.center[0],
						lat: place.center[1]
					});
					
					flag = true;
                }
			});
			
            if (!flag) {
                // A changer par: voici la liste des villes ressemblant à votre recherche, merci de choisir celle que vous désirez ou refaites une recherche
				let places = []
				for (let i = 0; i < body.features.length; i++) {
					places[i] = {}
					places[i].placeName = body.features[i].place_name
					places[i].lon = body.features[i].center[0]
					places[i].lat = body.features[i].center[1]
				}

				callback (undefined, {
					msg: 'Adresse exacte non trouvée ! Choisis parmi ces possibilités ou relance une recherche !',
					places: places
				})

				// callback(undefined, {
				// 	msg: 'Adresse exacte non trouvée, on prend la première !',
				// 	placeName: body.features[0].place_name,
				// 	lon: body.features[0].center[0],
				// 	lat: body.features[0].center[1]
				// })
            }
        }
    })
}

module.exports = geocode;

/* exemple de réception :

response.body.features = {
  id: 'place.14132713805687850',
  type: 'Feature',
  place_type: [ 'place' ],
  relevance: 1,
  properties: { wikidata: 'Q601557' },
  text: 'Voillans',
  place_name: 'Voillans, Doubs, France',
  bbox: [ 6.394482, 47.372953, 6.446844, 47.40853 ],
  center: [ 6.41306, 47.38667 ],
  geometry: { type: 'Point', coordinates: [ 6.41306, 47.38667 ] },
  context: [
    {
      id: 'region.14807182524296650',
      short_code: 'FR-25',
      wikidata: 'Q3361',
      text: 'Doubs'
    },
    {
      id: 'country.15996870960641660',
      short_code: 'fr',
      wikidata: 'Q142',
      text: 'France'
    }
  ]
}


response.body = {
  type: 'FeatureCollection',
  query: [ 'voillans' ],
  features: [
    {
      id: 'place.14132713805687850',
      type: 'Feature',
      place_type: [Array],
      relevance: 1,
      properties: [Object],
      text: 'Voillans',
      place_name: 'Voillans, Doubs, France',
      bbox: [Array],
      center: [Array],
      geometry: [Object],
      context: [Array]
    },
    {
      id: 'address.2987122713223032',
      type: 'Feature',
      place_type: [Array],
      relevance: 0.9375,
      properties: [Object],
      text: 'Vollans Street',
      place_name: 'Vollans Street, Lasalle, Ontario N9H 2S8, Canada',
      center: [Array],
      geometry: [Object],
      context: [Array]
    },
    {
      id: 'address.6842624674277760',
      type: 'Feature',
      place_type: [Array],
      relevance: 0.9375,
      properties: [Object],
      text: 'Vollans Avenue',
      place_name: 'Vollans Avenue, Mission, British Columbia V2V 7G5, Canada',
      center: [Array],
      geometry: [Object],
      context: [Array]
    },
    {
      id: 'address.8652055786709966',
      type: 'Feature',
      place_type: [Array],
      relevance: 0.9375,
      properties: [Object],
      text: "Vollan's Court",
      place_name: "Vollan's Court, Leeds, LS14 6WA, United Kingdom",
      center: [Array],
      geometry: [Object],
      context: [Array]
    }
  ],
  attribution: 'NOTICE: © 2020 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'
}

*/