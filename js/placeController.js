import {placeService} from './services/placeService.js';
//import {utilService} from './services/utilService.js';

window.initMap=initMap;
window.initPlaces=initPlaces;
window.onRemovePlace=onRemovePlace;
window.onZoomPlace=onZoomPlace;
window.onAddPlace=onAddPlace;

function initMap(lat=29.55724, lng=34.95294) {

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
        title: 'Eilat'
    })

    console.log("marker is", marker)
//
}

function initPlaces() {
    renderPlaces();
}

async function renderPlaces() {
    let places = await placeService.getPlaces();
    console.log("places",places);
    let strHtmls= `
        <form id="add-place" onsubmit="onAddPlace(event)">
            <div class="row">
            <div class="col-25">
                <label for="place-name">Name</label>
            </div>
            <div class="col-75">
                <input type="text" id="placeName" name="placeName" class="placeName">
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="lat">Latitude</label>
            </div>
            <div class="col-75">
                <input type="number" id="lat" name="lat" min="0" step="0.0000001" class="lat-input">
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="lng">Longitude</label>
            </div>
            <div class="col-75">
                <input type="number" id="lng" name="lng" min="0" step="0.01" class="lng-input">
            </div>
            </div>
            
            <div class="row">
            <input type="submit" value="Add place">
            </div>

            <br><br>
        </form>
    `;
    strHtmls += places.map(place => `
        <article class="place-preview">
            ${place.name}
            <button title="Delete place" class="btn-remove" onclick="onRemovePlace('${place.id}')">X</button>
            <button title="Zoom Place" class="btn-zoom-place" onclick="onZoomPlace('${place.id}')">Zoom</button>
        </article>
        `
    )
   
    let placesDiv = document.querySelector('.places');
    placesDiv.innerHTML = strHtmls;

}

function onAddPlace(ev){
    ev.preventDefault();
    const addedPlace = Object.fromEntries(new FormData(ev.target));
    console.log("addedPlace, ",addedPlace);
    placeService.addPlace(addedPlace.placeName,addedPlace.lat,addedPlace.lng);
    renderPlaces();
}

async function onRemovePlace(placeId){
    console.log("onRemovePlace!, ",placeId);
    //ev.preventDefault();
    //placeService.removePlace(placeId);
    const result = await placeService.removePlace(placeId);
    renderPlaces();
}

async function onZoomPlace(placeId){
    console.log("on Zoom Place!, ",placeId);
    
    try {
        const place = await placeService.getPlaceById(placeId)
        const lat = place.lat;
        const lng = place.lng;
        const name = place.name;

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
            title: name
        })
    } catch (err) {
        console.log('Error', err)
        flashMsg('Cannot zoom place')
    }
    
}