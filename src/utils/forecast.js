const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/04a3e3e70bbf052c3c67e70b1e9a19bd/' + latitude +',' + longitude + '?units=si'
   
     request({url, json: true}, (error, { body }) => {
       if(error){
         callback('Unable to connect to weather service', undefined)
       } else if(body.error){
         callback('Unable to find location', undefined)
       } else{
         callback(undefined, {
            message: body.daily.data[0].summary  + ' It is currently ' + body.currently.temperature + ' degress out. Current wind speed ' + body.currently.windSpeed + 'mph. There is a ' + body.currently.precipProbability + '% chance of rain.'
         })
       }
     })
}

module.exports = forecast