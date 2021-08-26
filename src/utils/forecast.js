const  request = require('postman-request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
 const url ='http://api.weatherstack.com/current?access_key=28c2b9bf6ab4358c9f23c1fa809f7609&query=' + latitude + ',' + longitude + '&units=m'
    
 request({url, json: true}, (error, {body} = {}) =>{
    if(error) {
        callback('unable to connect to weather sevice', undefined)
    }else if (body.error){
        callback('unable to find location', undefined)
    } else {
        const temp = (body.current.temperature)
        const feels = (body.current.feelslike)
        callback(undefined, body.current.weather_descriptions[0] + `. it is currently ${temp} degrees out. its feels like ${feels} degrees out.`)
    }
 })

}



module.exports = forecast