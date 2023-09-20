//import { storageService } from './services/localStorageService.js'

const gPlaces = [
{id: '1', lat: 32.1416, lng: 34.831213, name: 'Pukis 1', zoom: 8},
{id: '2', lat: 32.1416, lng: 36.831213, name: 'Pukis 2', zoom: 8},
{id: '3', lat: 32.1416, lng: 38.831213, name: 'Pukis 3', zoom: 8},
{id: '4', lat: 32.1416, lng: 32.831213, name: 'Pukis 4', zoom: 8},
];

const STORAGE_KEY = 'placesDB'
const PAGE_SIZE = 5

function getPlaces() { 
    return gPlaces
}

function removePlace(placeId) {

} 

function addPlace(nameInput, latInput, lngInput, zoomInput) {
    let place = _createPlace(nameInput, latInput, lngInput, zoomInput)
} 

function getPlaceById(placeId) {

} 

function _createPlace(nameInput, latInput, lngInput, zoomInput) {
    return {
        id :utilServiceService.makeId(),
        lat : latInput,
        lng : lngInput,
        name : nameInput,
        zoom : zoomInput
    }

} 

function _createPlaces() {

    
} 

export const placeService = {
    getPlaces,
    removePlace,
    getPlaceById
}