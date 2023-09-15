import {localStorageService} from './localStorageService.js';

let gUser = {
    email : '',
    txtColor : '',
    bgColor : '',
    bgColor : '',
    birthDate: '',
    birthTime: ''
   } 
   
function setUser(userPrefs){
    gUser = userPrefs;
    localStorageService.post()
    console.log("gUser is",gUser);
   }




export const userService = {
    setUser
}
