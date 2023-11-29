// TODO
// 2. add custom control on the map
// 3. when saving user prefs , change for all pages
import {userService} from './services/userService.js'
import {utilService} from './services/utilService.js';


window.initUserSettings = initUserSettings
window.handleSubmit = handleSubmit

function initUserSettings(){
    console.log("initUserSettings");
    let userPrefs = utilService.loadFromStorage(1);
    console.log("userPrefs.BackgroundColor ",userPrefs.BackgroundColor);
    const element = document.querySelector('.backgroundColorInputClass');
    console.log("element is",element);
    console.log("element.value is",element.value);
    element.value = userPrefs.BackgroundColor;
}

function handleSubmit(ev){
    ev.preventDefault();
    const userPrefs = Object.fromEntries(new FormData(ev.target));
    userPrefs.points=+userPrefs.points;
    userService.setUser(userPrefs);
}