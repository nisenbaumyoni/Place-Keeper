import {placeService} from './services/placeService.js';
import {utilService} from './services/utilService.js';

window.initMap=initMap;
window.initPlaces=initPlaces;

// function mapReady() {
//     console.log('Map is ready')
// }

function initMap(lat=29.55724, lng=34.95294) {
    //            if (!lat) lat = 32.0749831
    //            if (!lng) lat = 34.9120554
    console.log("initMap Hi!")
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: 8
    }

    var map = new google.maps.Map(
        elMap,
        options
    )

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!'
    })

    console.log("marker is", marker)
//
}
function initPlaces() {
    renderPlaces();
}

async function renderPlaces() {
    let places = await placeService.getPlaces();
    // utilService.saveToStorage(2,places);
    console.log("places",places);
   
}

