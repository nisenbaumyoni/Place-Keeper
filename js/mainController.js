//import {placeService} from './services/placeService.js';
//import {userService} from './services/userService.js';
//import {utilService} from './services/utilService.js';
import {utilService} from './services/utilService.js';


window.initPlaceKeeper = initPlaceKeeper;






function initPlaceKeeper() {
    console.log("initPlaceKeeper");

    let userPrefs = utilService.loadFromStorage(1);

    const element = document.querySelector('#main');
    console.log("element is",element);

    element.style.backgroundColor = userPrefs.BackgroundColor;

}

function initUserSettings() {
}

function renderPlaces() {
    const places = placeService.getPlaces();

}