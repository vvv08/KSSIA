import makeRequest from "../utils/axios";

export const getAllCounts = async () => {
    try{
        const result = await makeRequest.get('/');
        return result.data
    }catch(err){
        console.log("Error: ",err)
    }
}