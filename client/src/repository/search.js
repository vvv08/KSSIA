import makeRequest from "../utils/axios"

//API to fetch search results
export const getSearchResults = async (term,district) => {
    try{
        const result = await makeRequest.get(`/searchResults?searchTerm=${term}&district=${district}`)
        return result.data;
    }catch(err){
        console.log("Error: ", err)
    }
}