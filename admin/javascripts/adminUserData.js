//import { getUserById } from "./userAPI.js";

const storage = window.localStorage;

const initialState = {
  userData: storage.getItem('userData') || null,
  timestamp: null,
  isLoggedIn: false
};

function cacheUserData(data) {
  storage.setItem('userData', JSON.stringify(data));
}

function myReducer(state = initialState, action) {
  switch(action.type) {
    case "LOGIN":
      cacheUserData(action.payload);
      return {
        userData: action.payload,
        timestamp: Date.now(),
        isLoggedIn: true
      };
    
    case "LOGOUT" : 
      storage.removeItem('userData');
      return {
        userData: null,
        timestamp: null,
        isLoggedIn: false
      };  
    default:  
      return state;
  }
};

// Fetch user cookie data from the API
const fetchUserData = async (urlLink) => {
  try {
    const userById = await fetch(urlLink);
    return userById.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // re-throw the error to propagate it up the promise chain
  }
};

/*
// Map all and merge user data and fetch additional details from token
const mapUserData = async (data) => {

  try {
    if (data.role === "ADMIN") {
      const user = await getUserById(data._id);
      user._id = data._id;
      return user; // Return the object directly
    }
    } catch (error) {
    console.log(error);
    return {}; // Return an empty object if an error occurs
  }
};
*/

// Main function to retrieve user data
export const userData = async (urlLink, type) => {

    const data = await fetchUserData(urlLink);
    const userData = await data.user//mapUserData(data.user);
   
    const state = myReducer(undefined, { type: type, payload: userData });

    state.timeStamp = state.timestamp;
    state.isLoggedIn = state.isLoggedIn;
    //state.userData;

    return state;
    //return userData;
};