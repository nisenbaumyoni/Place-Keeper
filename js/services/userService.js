// import {localStorageService} from './localStorageService.js';
import {utilService} from './utilService.js';


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
    utilService.saveToStorage(1,userPrefs);
    console.log("userPrefs saved in Storage is",gUser);
   }




export const userService = {
    setUser
}
