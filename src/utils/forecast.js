const request = require('request')

forecast  = (latitude, longitude, callback)=>{
    const forcastUrl = 'https://api.darksky.net/forecast/b7564d06ceff85bac8f1b73c2e3fb576/'+latitude+','+longitude+'?units=si'

    request({url : forcastUrl, json:true}, (error,response)=>{
        if(error){
            callback ('unable to connect with forcast',undefined)
        }else if(response.body.error){
            callback('unable to connect, please search again')
        }else{
            callback(undefined,response.body.daily.data[0].summary+'  it is currently '+ response.body.currently.temperature+'  degree out there. and there is '+response.body.currently.precipProbability+' % probablity of rain')
        }
    })
}

module.exports = {
    forecast : forecast
}