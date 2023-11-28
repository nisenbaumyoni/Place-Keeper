import {utilService} from './utilService.js';

const STORAGE_KEY = 'userDB'

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
    utilService.saveToStorage(STORAGE_KEY,userPrefs);
    console.log("userPrefs saved in Storage is",gUser);
   }

export const userService = {
    setUser
}
