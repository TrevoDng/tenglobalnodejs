export const getNotificationById = async (userId) => {
    
    const response = await fetch(`${window.location.origin}/notificationbyid/${userId}`);
    const res = await response.json();
    
    return res;
  }