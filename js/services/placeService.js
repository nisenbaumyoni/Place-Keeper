import {storageService} from './localStorageService.js'
import { utilService } from "./utilService.js";

export const placeService = {
    getPlaces,
    removePlace,
    getPlaceById,
    getPlaceById,
    addPlace,
}

const STORAGE_KEY = 'placesDB'

_createPlaces()

function getPlaces() { 
    return storageService.query(STORAGE_KEY)
}

async function removePlace(placeId) {
    console.log("placeService.removePlace, ",placeId);
    // let places = utilService.loadFromStorage(STORAGE_KEY)
    // const index = places.findIndex(object => {
    //     return object.id === placeId;
    // });

    // console.log("index, ",index);
    // places.splice(index, 1);
    // utilService.saveToStorage(STORAGE_KEY,places)

    //storageService.remove(STORAGE_KEY,placeId);

    const place = await storageService.remove(STORAGE_KEY, placeId)
    return place

} 

function addPlace(nameInput, latInput, lngInput) {
    let newPlace = _createPlace(nameInput, latInput, lngInput)
    let places = utilService.loadFromStorage(STORAGE_KEY)
    console.log("in AddPlace, places, ",places);
    places.push(newPlace);
    console.log("in AddPlace, places, ",places);
    utilService.saveToStorage(STORAGE_KEY,places)
} 

async function getPlaceById(placeId) {
    const place = await storageService.get(STORAGE_KEY, placeId)
    return place
}

function _createPlace(nameInput, latInput, lngInput) {
    return {
        id : utilService.makeId(),
        lat : latInput,
        lng : lngInput,
        name : nameInput
    }

} 

function _createPlaces() {
    let places = utilService.loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!places || !places.length) {
        places = [
            {id: '1', lat: 32.1416, lng: 34.831213, name: 'Pukis 1'},
            {id: '2', lat: 32.1416, lng: 36.831213, name: 'Pukis 2'},
            {id: '3', lat: 32.1416, lng: 38.831213, name: 'Pukis 3'},
            {id: '4', lat: 32.1416, lng: 32.831213, name: 'Pukis 4'},
            ];
       
    }
    utilService.saveToStorage(STORAGE_KEY, places)
}