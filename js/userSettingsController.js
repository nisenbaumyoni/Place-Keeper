import {userService} from './services/userService.js'

window.initUserSettings = initUserSettings
window.handleSubmit = handleSubmit

function initUserSettings(){
    console.log("initUserSettings");
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