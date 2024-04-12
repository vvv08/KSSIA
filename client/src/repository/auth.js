import makeRequest from "../utils/axios"

export const login = async (user) => {
    try{
        const result = await makeRequest.post('/admin/login',user);
        return result.data;
    }catch(err){
        return(err.response.data)
    }
}