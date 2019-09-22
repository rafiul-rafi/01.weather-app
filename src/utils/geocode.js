const request =require('request')

 const geocode = (address,callback) => {
     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFmaWFobWVkIiwiYSI6ImNrMDl5dzJtNzBlMHYzbnI3ZDc1N2JmMTgifQ.1ZXsqY8ca6C0ZSJ0_dVk_Q&limit=1'

     request({url: url, json:true},(error,response)=>{
         if(error){
             callback('unable to connet to server',undefined)
         }else if(response.body.features.length === 0){
             callback('unable to connect , please serarch again.....', undefined)
         }else{
             callback(undefined, {
                 latitude : response.body.features[0].center[1],
                 longitude : response.body.features[0].center[0],
                 location : response.body.features[0].place_name
             })
         }
     })
 }
 module.exports = {
     geocode : geocode
 }