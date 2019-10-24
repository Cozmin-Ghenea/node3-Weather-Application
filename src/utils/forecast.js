const request = require('request')


const force = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/8345eb18568ad02c035de72eb01433e0/'+latitude+','+longitude+'?units=si&lang=ro'
    request({ url, json: true}, (error,{body})=> {
        if (error){
             callback('Unable to connect to eather service!',undefined)
         } else if (body.error){
            callback(body.error,undefined)
          }else{
            callback(undefined,{
                                Progrnoza : body.daily.data[0].summary,
                                Temperatura : body.currently.temperature,
                                Precipitatii : body.daily.data[0].precipProbability*100,
                                Umiditate: body.daily.data[0].humidity*100,
                                Maxima: body.daily.data[0].temperatureHigh,
                                Minima: body.daily.data[0].temperatureLow
                                
            })
            }
    });
}

module.exports = force