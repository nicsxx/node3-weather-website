const  request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoibmljb3p4Y3pjIiwiYSI6ImNrc3BydXd3NjA2MG0yb212b2cxb2prbGgifQ.9IrAp2m4Lcu96p5yYSOAjw&limit=1'

    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location!.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
