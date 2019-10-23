const request = require('request')


const force = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/8345eb18568ad02c035de72eb01433e0/'+latitude+','+longitude+'?units=si&lang=ro'
    request({ url, json: true}, (error,{body})=> {
        if (error){
             callback('Unable to connect to eather service!',undefined)
         } else if (body.error){
            callback(body.error,undefined)
          }else{
            callback(undefined,body.daily.data[0].summary+" The weather in where you've choose to check is currently "+body.currently.temperature+" degrees out. There is a "+body.currently.precipProbability*100+"% chance of rain")
            }
    });
}

module.exports = force