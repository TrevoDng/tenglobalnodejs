export const getProofById = async (userId) => {
    
    const response = await fetch(`${window.location.origin}/api/auth/getproofbyid/${userId}`);
    const res = await response.json();
    
    return res;
  }