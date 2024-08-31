export const adminGetProof = async () => {
    try {
      // Get all proof data
      const proofData = await fetch(`${window.location.origin}/api/auth/admin/getProof/`);
      const data = await proofData.json(); // Wait for the JSON data
       
      return data;
    } catch (error) {
      console.error(error);
    }
  };