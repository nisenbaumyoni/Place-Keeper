// TODO
// 2. add custom control on the map
// 3. when saving user prefs , change for all pages
// 4. change "1" to userDb
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

    //element.setAttribute()
    //document.getElementById('.backgroundColorInputClass').value = element.value
    // userPrefs.BackgroundColor;
}

function handleSubmit(ev){
    ev.preventDefault();
    /*
    console.log("initUserSettings ",ev);
    let emailClass = document.querySelector(".email-input");
    console.log(emailClass.value);
    let emailId = document.querySelector("#email");
    console.log(emailId.value);
    let emailAttr = document.querySelector("[name=email]");
    console.log(emailAttr.value);
    */

    const userPrefs = Object.fromEntries(new FormData(ev.target));
    userPrefs.points=+userPrefs.points;
    //console.log(userPrefs);

    userService.setUser(userPrefs);
}