import {utilService} from './services/utilService.js';

window.initPlaceKeeper = initPlaceKeeper;

function initPlaceKeeper() {
    console.log("initPlaceKeeper");

    let userPrefs = utilService.loadFromStorage("userDB");

    const element = document.querySelector('#main');
    console.log("element is",element);

    element.style.backgroundColor = userPrefs.BackgroundColor;

}

function renderPlaces() {
    const places = placeService.getPlaces();

}