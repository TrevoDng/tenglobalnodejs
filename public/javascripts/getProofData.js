import { getProofById } from "./getProofAPI.js"

export const proofData = async (urlLink) => {
  let outputData = [];
  const userId = await fetch(urlLink);
  const resultsData = await userId.json();
  outputData = [resultsData.user];
  
  const proofObj = outputData.map(async (mappedUser, index) => {
    if (mappedUser.role === "USER") {
      const proof = await getProofById(mappedUser._id); //get all user data
      proof._id = mappedUser._id; // Add the _id to the user object
      return proof;
    }
  });

  const results = await Promise.all(proofObj);
  const proofDataArray = []; 
  
  results.forEach((proof) => {
    proofDataArray.push(...proof); 
  });
  
  return proofDataArray; 
};
  