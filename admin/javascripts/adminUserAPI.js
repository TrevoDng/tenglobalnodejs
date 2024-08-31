export const getUserById =async (userId) => {
    let userData = {};
    
    //get all user data
    await fetch(`${window.location.origin}/users/${userId}`)
    .then(res => res.json())
    .then((res) => {
        userData = res
    });
    
        
       return userData;
}