import { getNotificationById } from "./getNotificationAPI.js";

export const notificationData = async (urlLink) => {
    let outputData = [];
    const userId = await fetch(urlLink);
    const resultsData = await userId.json();
    outputData = [resultsData.user];
    
    const notificationObj = outputData.map(async (mappedUser, index) => {
      if (mappedUser.role === "USER") {
        const notification = await getNotificationById(mappedUser._id); //get all user data
        notification._id = mappedUser._id; // Add the _id to the user object
        return notification;
      }
    });
  
    const results = await Promise.all(notificationObj);
    const notificationDataArray = []; 
    
    results.forEach((notification) => {
      notificationDataArray.push(...notification); 
    });
    
    return notificationDataArray; 
  };