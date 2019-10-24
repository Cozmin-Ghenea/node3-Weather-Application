const request = require('request')


const force = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/8345eb18568ad02c035de72eb01433e0/'+latitude+','+longitude+'?units=si&lang=ro'
    request({ url, json: true}, (error,{body})=> {
        if (error){
             callback('Unable to connect to eather service!',undefined)
         } else if (body.error){
            callback(body.error,undefined)
          }else{
            callback(undefined,body.daily.data[0].summary+", \n Temperatura : "+body.currently.temperature+", \n Probabilitate de ploaie : "+body.currently.precipProbability*100+"%, \n Umiditate: "+body.daily.data[0].humidity)
            }
    });
}

module.exports = force